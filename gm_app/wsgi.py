from app import create_app
from dotenv import load_dotenv
import os, sys

sys.path.append(os.getcwd())

load_dotenv()

application = create_app(config_name='default')


@application.cli.command()
def test():
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)

if __name__ == '__main__':
    application.run(host="0.0.0.0" ,port=8080)
