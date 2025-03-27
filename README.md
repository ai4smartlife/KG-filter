**from main folder**

# install environment
pip install -r requirements.txt

# RUN from main folder

_linux_:

uvicorn main:app --reload --port 8085 

_window_:

python -m uvicorn main:app --reload

(change port if necessary)

# send json:

## from fastapi _domain_/docs:

example json:
{
  "question": "string question"
}

## OR from terminal

curl -X 'POST' \
  'http://127.0.0.1:8085/biomedical-response/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "question": "change your question"
}'

_replace http://127.0.0.1:8085 with your domain
_
