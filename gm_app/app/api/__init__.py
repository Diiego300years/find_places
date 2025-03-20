from flask import Blueprint
from flask_restful import Api
import redis

api_bp = Blueprint('api', __name__)
api = Api(api_bp)
redis_client = redis.Redis(host='redis-server', port=6379, db=0, decode_responses=True)

from .routes_search_page import *
from .routes_home_page import *
from .routes_agent import *
