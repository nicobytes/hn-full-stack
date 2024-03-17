FROM python:3.10

WORKDIR /app
COPY ./app/requirements.txt /app/

RUN pip install -r requirements.txt

COPY ./app /app/

CMD celery -A tasks worker -B -l INFO