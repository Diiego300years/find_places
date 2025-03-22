import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.getcwd(), '.env'))

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    FLASK_DEBUG = os.environ.get('FLASK_DEBUG')
    FLASK_APP=os.environ.get('FLASK_APP')

    #docker update
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL')

    SQLALCHEMY_RECORD_QUERIES = True
    FLASKY_POSTS_PER_PAGE = 20
    FLASKY_FOLLOWERS_PER_PAGE = 50
    FLASKY_COMMENTS_PER_PAGE = 30
    FLASKY_SLOW_DB_QUERY_TIME = 0.5

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL')
    # WTF_CSRF_ENABLED = False


class ProductionConfig(Config):
    FLASK_ENV = 'production'
    FLASK_APP=os.environ.get('FLASK_APP')

    # COOKIE
    # Only for http not js
    SESSION_COOKIE_HTTPONLY = True

########################################## Docker ###############################################

class DevelopmentConfigWithDocker(Config):
    FLASK_ENV = 'default'
    FLASK_DEBUG = os.environ.get('FLASK_DEBUG')
    FLASK_APP = os.environ.get('FLASK_APP')

    #Celery config
    CELERY=dict(
        broker="redis://redis-server:6379/0",
        backend="redis://redis-server:6379/0",
        task_ignore_result=False,
    )

    # SQLALCHEMY_DATABASE_URI = os.environ.get('DOCKER_DEV_DATABASE_URL')

class TestingConfigWithDocker(Config):
    FLASK_ENV = 'testing'

    # true for turn off errors handling
    TESTING = True
    FLASK_DEBUG = os.environ.get('FLASK_DEBUG')
    FLASK_APP = os.environ.get('FLASK_APP')

    SQLALCHEMY_DATABASE_URI = os.environ.get('DOCKER_TEST_SQLALCHEMY_DATABASE_URI')



config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfigWithDocker,
    'developmentWithDocker': DevelopmentConfigWithDocker,
    'testingConfigWithDocker': TestingConfigWithDocker
}