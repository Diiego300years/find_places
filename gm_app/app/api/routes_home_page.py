from . import api
from flask import Flask, request
from flask_restful import Resource, Api
import os
import json

# Data to return
file_path = os.path.join(os.path.dirname(__file__), 'texts.json')
try:
    with open(file_path, encoding='utf-8') as file:
        texts = json.load(file)
except FileNotFoundError:
    texts = {}

# ------------------------------
# Endpoint: /home - handle translations
# ------------------------------
class ContentEndpoint(Resource):
    def get(self, page, lang=None):
        lang = lang or request.accept_languages.best_match(['pl', 'en', 'de']) or 'pl'

        if page not in texts:
            return {"error": "Strona nie istnieje"}, 404

        if lang not in texts[page]:
            lang = 'pl'
        return texts[page][lang]


# Dynamic endpoint: handle `/home`, `/page`, `/about` + optional `/pl`, `/en`, `/de`
api.add_resource(ContentEndpoint, '/<string:page>', '/<string:page>/<string:lang>')

