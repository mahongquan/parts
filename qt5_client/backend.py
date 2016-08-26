import logging
import datetime
import time
logging.basicConfig()
log = logging.getLogger()
log.setLevel(logging.DEBUG)
USEREST=False
if USEREST:
    from .backend_rest import *
else:
    from .backend_django import *
if __name__=="__main__":
    login()
