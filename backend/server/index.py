from flask import Flask, jsonify, request
import json
import xrpl

app = Flask(__name__)

with open('config.json') as f:
    config = json.load(f)

def mintTokens(user_address, token_quantity):
    client = xrpl.clients.JsonRpcClient(config['testnet_url'])
    hot_wallet = xrpl.wallet.Wallet.from_secret(config['manager_secret'])
    
    send_token_tx = xrpl.models.transactions.Payment(
        account=hot_wallet.address,
        destination=user_address,
        amount=xrpl.models.amounts.issued_currency_amount.IssuedCurrencyAmount(
            currency=config['currency_code'],
            issuer=config['issuer_address'],
            value=token_quantity
        )
    )

    response = xrpl.transaction.submit_and_wait(send_token_tx, client, hot_wallet)

    return response.status == 'success'

@app.route('/api/user_balance', methods = ['GET'])
def userBalance():
    req = request.get_json()

    client = xrpl.clients.JsonRpcClient(config['testnet_url'])    

    response = client.request(xrpl.models.requests.AccountLines(
        account=req['address'],
        ledger_index="validated",
    ))

    lines = response.result['lines']

    if not lines:
        return 'no balance', 400

    bals = [x for x in lines if x['account'] == config['issuer_address'] and x['currency'] == config['currency_code']]

    if not bals:
        return 'no balance', 400
    
    return bals[0]['balance']

def quizResult(user, quiz_id):
    tries = 0

    with open('quiz_records.txt') as file:
        contents = file.read().strip()
        if contents:
            records = [line.split(':') for line in contents.split('\n')]
            for (address, quiz, passed) in records:
                if (address == user and quiz == str(quiz_id)):
                    tries += 1
                    if passed == 'pass':
                        # solved
                        return {
                            'solved': True,
                            'tries': tries
                        }
    return {
        'solved': False,
        'tries': tries
    }

@app.route('/api/quiz_tries', methods = ['GET'])
def quizTries():
    req = request.get_json()
    return quizResult(req['address'], req['quiz'])

@app.route('/api/submit_quiz', methods = ['POST'])
def submitQuiz():
    req = request.get_json()

    quiz_result = quizResult(req['address'], req['quiz'])

    if quiz_result['solved']:
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
            with open('quiz_records.txt', 'a+') as file:
                file.write(f"{req['address']}:{req['quiz']}:fail\n")
            return 'wrong answers', 400

    # mint token
    if not mintTokens(req['address'], 20):
        return 'transfer failed', 400

    # save
    with open('quiz_records.txt', 'a+') as file:
        file.write(f"{req['address']}:{req['quiz']}:pass\n")

    return '', 200

'''
Submit Quiz:

curl  -X POST -H "Content-Type: application/json" -d \
  '{"address": "rp37MDwmN5BR5bDtt6r8L8NbKaZ3YLMEFQ", "quiz": '2', "answers": ["b", "b", "d", "c"] }' \
  http://localhost:8888/api/submit_quiz

Balance:

curl  -X POST -H "Content-Type: application/json" -d \
  '{"address": "rp37MDwmN5BR5bDtt6r8L8NbKaZ3YLMEFQ"}' \
  http://localhost:8888/api/user_balance

Tries:

curl  -X GET -H "Content-Type: application/json" -d \
  '{"address": "rp37MDwmN5BR5bDtt6r8L8NbKaZ3YLMEFQ", "quiz": '2'}' \
  http://localhost:8888/api/quiz_tries
'''
