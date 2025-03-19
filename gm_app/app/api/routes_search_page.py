from flask_restful import Resource
from flask import request, jsonify
import json
import os
from . import api

todos = {}

file_path = os.path.join(os.path.dirname(__file__), 'texts.json')
try:
    with open(file_path, encoding='utf-8') as file:
        texts = json.load(file)
except FileNotFoundError:
    texts = {}

class SearchEndpoint(Resource):

    def get(self):
        lang = request.accept_languages.best_match(['pl', 'en', 'de']) or 'pl'

        data = {
            "message": "test"
        }
        return data, 200

    def put(self, todo_id):
        todos[todo_id] = request.form['data']
        return {todo_id: todos[todo_id]}


api.add_resource(SearchEndpoint, '/search_page')
