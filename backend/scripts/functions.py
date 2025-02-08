import xrpl
from xrpl.clients import JsonRpcClient
from xrpl.wallet import Wallet

# Generated here: https://xrpl.org/resources/dev-tools/xrp-faucets

TESTNET_URL = "https://s.altnet.rippletest.net:51234/"
TOKEN_ID = 0
ADDRESS = "rBrZLAm4G3WVDjkMmf83FTFLkAVq2r37XG" # Seq: 4660535
SECRET = "sEd7yxXXXtWrExuYc8E9NJmjJYpiCvF"



# ---

def get_account_info(accountId):
    """get_account_info"""
    client = xrpl.clients.JsonRpcClient(TESTNET_URL)
    acct_info = xrpl.models.requests.account_info.AccountInfo(
        account=accountId,
        ledger_index="validated"
    )
    response = client.request(acct_info)
    return response.result['account_data']

def initialiseToken():
    ...

def mintTokens(user_address, token_quantity):
    """ Mint `token_quantity` tokens for `user_address` """

    # Waiting on response from Ripple devs

    print("Assume tokens minted.")


# ---


# Something like has to be signed on the frontend
def create_trust_line(token_receiving_wallet_secret, issuer_address, amount, currency="CTC"):
    """create_trust_line"""
    # Get the client
    token_receiving_wallet = Wallet.from_seed(token_receiving_wallet_secret)
    client = JsonRpcClient(TESTNET_URL)
    
    # Define the trust line transaction
    trustline_tx=xrpl.models.transactions.TrustSet(
        account=token_receiving_wallet.address,
        limit_amount=xrpl.models.amounts.IssuedCurrencyAmount(
            currency=currency,
            issuer=issuer_address,
            value=int(amount)
        )
    )

    response =  xrpl.transaction.submit_and_wait(trustline_tx, client, token_receiving_wallet_secret)
    return response.result
