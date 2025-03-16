from flask import Flask
import os
from .configuration.config import config
from .api.routes_search_page import SearchEndpoint
from flask_restful import Api
from .api import api_bp
from flask_cors import CORS

# api = Api(api_bp)

# I decided to use several configuration sets
def create_app(config_name):
    config_name = os.getenv('FLASK_CONFIG', 'default')
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    CORS(app)

    app.register_blueprint(api_bp, url_prefix='/api_v1')

    # api.add_resource(SearchEndpoint, '/search_page')

    # api.init_app(app)

    return app
