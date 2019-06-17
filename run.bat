set path=%~d0\python37;%~d0\python37\scripts
rem python backend_alchemy.py
set FLASK_ENV=development
set FLASK_APP=server.py
python -m flask run --host=0.0.0.0 --port=8000
rem python server.py
