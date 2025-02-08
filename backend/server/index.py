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

@app.route('/api/submit_quiz', methods = ['POST'])
def submitQuiz():
    req = request.get_json()

    with open('quiz_records.txt') as file:
        contents = file.read().strip()

        if contents:
            records = [line.split(':') for line in contents.split('\n')]
            for (address, quiz) in records:
                if (address == req['address'] and quiz == str(req['quiz'])):
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

    # mint token
    if not mintTokens(req['address'], 20):
        return 'transfer failed', 400

    # save
    with open('quiz_records.txt', 'a+') as file:
        record = f"{req['address']}:{req['quiz']}"
        file.write(f"{record}\n")
        file.close()

    return '', 200

'''
curl  -X POST -H "Content-Type: application/json" -d \
  '{"address": "rp37MDwmN5BR5bDtt6r8L8NbKaZ3YLMEFQ", "quiz": '2', "answers": ["b", "b", "d", "c"] }' \
  http://localhost:8888/api/submit_quiz
'''