from celery import Celery
from celery.schedules import crontab
import time
import random
import requests

app = Celery('tasks', broker='redis://redis:6379/')

app.conf.beat_schedule = {
    'each 2 min': {
        'task': 'tasks.suma',
        'schedule': crontab(minute='*/1')
    },
}
app.conf.timezone = 'UTC'

@app.task()
def suma():
    return random.randint(1, 100)

if __name__ == '__main__':
    app.start()