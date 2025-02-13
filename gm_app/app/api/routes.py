from flask_restful import Resource
from flask import request


todos = {}

class HelloWorld(Resource):

    def get(self):
        return {"message": "Hello, world!"}

    def put(self, todo_id):
        todos[todo_id] = request.form['data']
        return {todo_id: todos[todo_id]}
