from flask import Flask
import os
from .configuration.config import config
from .api.routes_search_page import SearchEndpoint
from .api import api_bp
from flask_cors import CORS
from .celery_worker import celery_init_app


# I decided to use several configuration sets
def create_app(config_name):
    config_name = os.getenv('FLASK_CONFIG', 'default')
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    CORS(app)

    # In Flask 3.x is app.config.from_prefixed_env() but I like config from object.

    app.register_blueprint(api_bp, url_prefix='/api_v1')
    celery_init_app(app)

    return app
