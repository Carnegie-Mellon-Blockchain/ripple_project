import xrpl
from xrpl.wallet import Wallet
from pprint import pprint

# Generated here: https://xrpl.org/resources/dev-tools/xrp-faucets

# Issuer
COLD_ADDRESS = "rBrZLAm4G3WVDjkMmf83FTFLkAVq2r37XG" # Seq: 4660535
COLD_SECRET = "sEd7yxXXXtWrExuYc8E9NJmjJYpiCvF"

# Hot
HOT_ADDRESS = "rBHL44Z6NdghWEVNrymbLBKajngSRtE1cE"
HOT_SECRET = "sEdS8LTWDjwCbgeR4mgJPGG3MDRGcEi"

# User 1
USER_1_ADDRESS = "rp37MDwmN5BR5bDtt6r8L8NbKaZ3YLMEFQ"
USER_1_SECRET = "sEdSzDeb2Jq7xpQne7o1i6cXkPgdTKo"

# User 2
USER_2_ADDRESS = "r3JuLmWfNUSztvaG3TbzWcbRvyzMAhSGkt"
USER_2_SECRET = "sEdVJyK2pMhEFzahTwxNuNkL199adUi"

# User 3
USER_3_ADDRESS = "rsX8LRAS1UxofXTVyEWUpfurhD5NZ4rrko"
USER_3_SECRET = "sEd7Gmjx78u85tn4nuCeuQEHGnU7SzN"

TESTNET_URL = "https://s.altnet.rippletest.net:51234/"

CURRENCY_CODE = "CTS" # ClarityFi - ClarityScore (CTS)

# Objects
client = xrpl.clients.JsonRpcClient(TESTNET_URL)
cold = Wallet.from_secret(COLD_SECRET)
hot = Wallet.from_secret(HOT_SECRET)
user1 = Wallet.from_secret(USER_1_SECRET)
user2 = Wallet.from_secret(USER_2_SECRET)
user3 = Wallet.from_secret(USER_3_SECRET)

# Directory
addresses = {
    COLD_ADDRESS: "Cold",
    HOT_ADDRESS: "Hot",
    USER_1_ADDRESS: "User 1",
    USER_2_ADDRESS: "User 2",
    USER_3_ADDRESS: "User 3",
}

# We have a trust line from hot to cold
# We have a trust line from u1 to hot (redundant)

def printFullBalances(co=True, ho=False, u1=False, u2=False, u3=False):
    # Check balances

    if co:
        print("\nGetting cold address balances...\n")
        response = client.request(xrpl.models.requests.GatewayBalances(
            account=cold.address,
            ledger_index="validated",
            hotwallet=[hot.address]
        ))
        pprint(response)

    if ho:
        print("\nGetting hot address balances...\n")
        response = client.request(xrpl.models.requests.AccountLines(
            account=hot.address,
            ledger_index="validated",
        ))
        pprint(response)

    if u1:
        print("\nGetting user 1 address balances...\n")
        response = client.request(xrpl.models.requests.AccountLines(
            account=user1.address,
            ledger_index="validated",
        ))
        pprint(response)

    if u2:
        print("\nGetting user 2 address balances...\n")
        response = client.request(xrpl.models.requests.AccountLines(
            account=user2.address,
            ledger_index="validated",
        ))
        pprint(response)

    if u3:
        print("\nGetting user 3 address balances...\n")
        response = client.request(xrpl.models.requests.AccountLines(
            account=user3.address,
            ledger_index="validated",
        ))
        pprint(response)

def printBalances():
    print(f"\nGetting balances...\n")

    response = client.request(xrpl.models.requests.GatewayBalances(
        account=cold.address,
        ledger_index="validated",
        hotwallet=[hot.address]
    ))
    
    balances = response.result["balances"]
    labelled = {(addresses.get(k, "Unknown")):v for k, v in balances.items()}
    pprint(labelled)
    print()

if False:
    # Create trust line from user1 to cold address
    
    printBalances()
    
    trust_set_tx = xrpl.models.transactions.TrustSet(
        account=user1.address,
        limit_amount=xrpl.models.amounts.issued_currency_amount.IssuedCurrencyAmount(
            currency=CURRENCY_CODE,
            issuer=cold.address,
            value="10000000000", # Large limit, arbitrarily chosen
        )
    )

    print("Creating trust line from user1 address to issuer...")
    response = xrpl.transaction.submit_and_wait(trust_set_tx, client, user1)
    print(response)

    printBalances()

if False:
    # Send token from hot wallet to user1 wallet

    printFullBalances(co=True, ho=True, u1=True, u2=True, u3=False)

    transfer_quantity = "1000000" # 1M
    
    send_token_tx = xrpl.models.transactions.Payment(
        account=hot.address,
        destination=user1.address,
        amount=xrpl.models.amounts.issued_currency_amount.IssuedCurrencyAmount(
            currency=CURRENCY_CODE,
            issuer=cold.address,
            value=transfer_quantity
        )
    )

    print(f"Sending {transfer_quantity} {CURRENCY_CODE} to {addresses[user1.address]}...")
    response = xrpl.transaction.submit_and_wait(send_token_tx, client, hot)
    print(response)

    printFullBalances(co=True, ho=True, u1=True, u2=True, u3=False)

if True:
    printFullBalances(co=True, ho=True, u1=True, u2=True, u3=False)
