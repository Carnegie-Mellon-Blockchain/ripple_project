""" Generates a keypair (public and private key) and saves it to `keypair.json`. """

from xrpl.constants import CryptoAlgorithm, XRPLException
from xrpl.core.keypairs import derive_classic_address, derive_keypair, generate_seed
import json

testnet_url = "https://s.altnet.rippletest.net:51234/"

algorithm = CryptoAlgorithm.ED25519
seed = generate_seed(algorithm=algorithm)
keypair = derive_keypair(seed)

with open("keypair.json", "w") as f:
    json.dump({
        "public_key": keypair[0],
        "private_key": keypair[1],
        "address": derive_classic_address(keypair[0]),
    }, f, indent=4)
