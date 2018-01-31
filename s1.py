import wsgiserver
from mysite import wsgi
# def my_app(environ, start_response):
#     status = '200 OK'
#     response_headers = [('Content-type','text/plain')]
#     start_response(status, response_headers)
#     return ['WSGIserver is running!']

server = wsgiserver.WSGIServer(wsgi.application, host='0.0.0.0', port=8000)
print("host='0.0.0.0', port=8000")
server.start()