from app import create_app
from dotenv import load_dotenv
import os, sys
from flask import request

sys.path.append(os.getcwd())
print("Aktualny katalog roboczy:", os.getcwd())

load_dotenv()

application = create_app(config_name='default')
# celery_app = application.extensions["celery"]
celery_app = application.extensions["celery"]

print(application.config)


@application.before_request
def log_request_info():
    print(f"Żądanie: {request.method} {request.path}")

@application.cli.command()
def test():
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)

if __name__ == '__main__':
    application.run(host="0.0.0.0" ,port=8080, debug=True)
