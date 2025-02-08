from flask import Flask, jsonify, request
from scripts.functions import mintTokens
import json

app = Flask(__name__)

@app.route('/api/submit_quiz', methods = ["POST"])
def submitQuiz():
    req = request.get_json()

    file = open('quiz_records.json', 'a+')

    contents = file.read()
    if contents:
        records = contents.split('\n')
        for address, quiz in records:
            if (address == req['address'] and quiz == req['quiz']):
                # solved
                return 'already solved', 400

    # check answers
    sol_file = open('solutions.json', 'r')
    solutions = json.load(sol_file)

    try:
        sol = solutions[str(req['quiz'])]
    except:
        return 'solutions not found', 400

    for i in range(len(sol)):
        if sol[i] != req['answers'][i]:
            return 'wrong answers', 400

    # save
    record = f"\"{req['address']}\": \"{req['quiz']}\""
    file.write(f"{record}\n")

    # mint token
    mintTokens(req['address'], 20)

    return '', 200
