#!/bin/sh
export FLASK_APP=./server/index.py
pipenv run flask --debug run -h 0.0.0.0 -p 8888
