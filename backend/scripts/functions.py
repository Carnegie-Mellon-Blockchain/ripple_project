import xrpl

# Generated here: https://xrpl.org/resources/dev-tools/xrp-faucets

TESTNET_URL = "https://s.altnet.rippletest.net:51234/"
TOKEN_ID = 0
ADDRESS="rBrZLAm4G3WVDjkMmf83FTFLkAVq2r37XG" # Seq: 4660535
SECRET="sEd7yxXXXtWrExuYc8E9NJmjJYpiCvF"


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
