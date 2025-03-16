from . import api
from flask import Flask, request
from flask_restful import Resource, Api
import os
import json

# 🔹 Dane przykładowe dla różnych stron i języków
file_path = os.path.join(os.path.dirname(__file__), 'texts.json')
try:
    with open(file_path, encoding='utf-8') as file:
        texts = json.load(file)
except FileNotFoundError:
    texts = {}


class ContentEndpoint(Resource):
    def get(self, page, lang=None):
        # Jeśli brak języka → użyj `Accept-Language` lub domyślnego 'pl'
        lang = lang or request.accept_languages.best_match(['pl', 'en', 'de']) or 'pl'

        # Sprawdzenie czy istnieją dane dla danej strony
        if page not in texts:
            return {"error": "Strona nie istnieje"}, 404

        # Sprawdzenie, czy dany język jest obsługiwany
        if lang not in texts[page]:
            lang = 'pl'  # Domyślny język, jeśli brak tłumaczenia

        # Zwrócenie danych
        return texts[page][lang]


# 🔹 Dynamiczny endpoint: obsługuje `/home`, `/page`, `/about` + opcjonalnie `/pl`, `/en`, `/de`
api.add_resource(ContentEndpoint, '/<string:page>', '/<string:page>/<string:lang>')

