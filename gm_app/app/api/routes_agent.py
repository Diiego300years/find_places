import json
from flask import request
from flask_restful import Resource
from ..celery_worker.tasks import make_request
from celery.result import AsyncResult
import logging
from . import api, redis_client

# ------------------------------
# Endpoint: /send - Start job
# ------------------------------
class SendRequest(Resource):
    def post(self):
        data = request.json
        urls = data.get('urls')
        if urls and isinstance(urls, list):
            task = make_request.delay(urls)

            return {'task_id': task.id}, 202
        return {'error': 'URL is required'}, 400

# ------------------------------
# Endpoint: /status/<task_id> - Check task stataus
# ------------------------------
class StatusRequest(Resource):
    def get(self, task_id):
        def on_message(body):
            logging.info(f"Postęp/status zadania: {body}")
            return {'status': body['status']}

        task = AsyncResult(task_id)
        logging.info(f"Status zadania {task_id}: {task.state}")
        logging.info(f"Task info: {task.info}")

        try:
            task.get(timeout=10, on_message=on_message)
        except TimeoutError:
            logging.info(f"Timeout: Zadanie {task_id} jeszcze trwa.")
            return {'status': 'STARTED'}

        return {'status': task.state or 'UNKNOWN'}

# ------------------------------
# Endpoint: /result/<task_id> - Return result of chosen task
# ------------------------------
class ResultRequest(Resource):
    def get(self, task_id):
        print("działa?")
        task = AsyncResult(task_id)
        # logging.info(f"Task info: {task.info}")
        logging.info(f"WYNIK ZADANIA {task_id}: {task.state}")
        # logging.info(f"Task info: {task.info}")
        if task.state == 'SUCCESS':
            result = task.result
            return {'result': result}
        else:
            return {'error': task.state}, 500
        return {'status': task.state}

# ------------------------------
# Endpoint: /result/ - Return results from all tasks
# ------------------------------
class AllResultsRequest(Resource):
    def get(self):
        task_keys = redis_client.keys("celery-task-meta-*")
        print("coś", task_keys)

        results = []
        for key in task_keys:
            task_info = redis_client.get(key)
            if task_info:
                try:
                    # 🔹 Usuń .decode(), ponieważ `task_info` jest już str
                    task_data = json.loads(task_info)
                    results.append(task_data)
                except json.JSONDecodeError:
                    logging.error(f"Nie udało się odczytać danych dla klucza: {key}")
        return results



# ------------------------------
# Register endpoints as always
# ------------------------------
api.add_resource(SendRequest, '/send')
api.add_resource(StatusRequest, '/status/<task_id>')
api.add_resource(ResultRequest, '/result/<task_id>')
api.add_resource(AllResultsRequest, '/result/')
