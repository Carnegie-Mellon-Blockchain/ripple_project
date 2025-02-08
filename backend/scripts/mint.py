import xrpl
from xrpl.wallet import Wallet
from pprint import pprint

# Generated here: https://xrpl.org/resources/dev-tools/xrp-faucets

# Issuer
COLD_ADDRESS = "rBrZLAm4G3WVDjkMmf83FTFLkAVq2r37XG" # Seq: 4660535
COLD_SECRET = "sEd7yxXXXtWrExuYc8E9NJmjJYpiCvF"

# User
HOT_ADDRESS = "rBHL44Z6NdghWEVNrymbLBKajngSRtE1cE"
HOT_SECRET = "sEdS8LTWDjwCbgeR4mgJPGG3MDRGcEi"

TESTNET_URL = "https://s.altnet.rippletest.net:51234/"

CURRENCY_CODE = "CTS" # ClarityFi - ClarityScore (CTS)

# Objects
client = xrpl.clients.JsonRpcClient(TESTNET_URL)
cold = Wallet.from_secret(COLD_SECRET)
hot = Wallet.from_secret(HOT_SECRET)

if False:
    # Configure issuer (cold address) settings

    cold_settings_tx = xrpl.models.transactions.AccountSet(
        account=cold.address,
        transfer_rate=0,
        tick_size=5,
        domain=bytes.hex("example.com".encode("ASCII")),
        set_flag=xrpl.models.transactions.AccountSetAsfFlag.ASF_DEFAULT_RIPPLE,
    )

    print("Sending cold address AccountSet transaction...")
    response = xrpl.transaction.submit_and_wait(cold_settings_tx, client, cold)
    print(response)

if False:
    # Configure hot address settings

    hot_settings_tx = xrpl.models.transactions.AccountSet(
        account=hot.address,
        set_flag=xrpl.models.transactions.AccountSetAsfFlag.ASF_REQUIRE_AUTH,
    )

    print("Sending hot address AccountSet transaction...")
    response = xrpl.transaction.submit_and_wait(hot_settings_tx, client, hot)
    print(response)

if False:
    # Create trust line from hot to cold address
    
    trust_set_tx = xrpl.models.transactions.TrustSet(
        account=hot.address,
        limit_amount=xrpl.models.amounts.issued_currency_amount.IssuedCurrencyAmount(
            currency=CURRENCY_CODE,
            issuer=cold.address,
            value="10000000000", # Large limit, arbitrarily chosen
        )
    )

    print("Creating trust line from hot address to issuer...")
    response = xrpl.transaction.submit_and_wait(trust_set_tx, client, hot)
    print(response)

    # TODO: Ensure CTS is non-transferable

if False:
    # Send token from cold wallet to hot wallet

    issue_quantity = "1000000" # 1M
    
    send_token_tx = xrpl.models.transactions.Payment(
        account=cold.address,
        destination=hot.address,
        amount=xrpl.models.amounts.issued_currency_amount.IssuedCurrencyAmount(
            currency=CURRENCY_CODE,
            issuer=cold.address,
            value=issue_quantity
        )
    )

    print(f"Sending {issue_quantity} {CURRENCY_CODE} to {hot.address}...")
    response = xrpl.transaction.submit_and_wait(send_token_tx, client, cold)
    print(response)

if True:
    # Check balances

    print("Getting hot address balances...\n")
    response = client.request(xrpl.models.requests.AccountLines(
        account=hot.address,
        ledger_index="validated",
    ))
    pprint(response)

    print("\nGetting cold address balances...\n")
    response = client.request(xrpl.models.requests.GatewayBalances(
        account=cold.address,
        ledger_index="validated",
        hotwallet=[hot.address]
    ))
    pprint(response)
