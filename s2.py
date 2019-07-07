from waitress import serve
from mysite import wsgi
serve(wsgi.application, host='0.0.0.0', port=8000)