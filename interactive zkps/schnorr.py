import hashlib
import secrets
import time
from ecdsa.curves import NIST521p

iterations = 100
start = time.time()

curve = NIST521p
gen = curve.generator
p = gen.order()

def KeyGen():
    # Generate a private key 'x' as a random number from [1, p-1].
    x = secrets.randbelow(p)
    while x == 0:  # Ensure 'x' is not zero.
        x = secrets.randbelow(p)
    
    # Calculate the public key (elliptic curve point multiplication).
    X = gen * x
    
    return X, x  # (public key, private key).

def Sign(X, x, m):
    # Generate a random nonce 'r' for the signature.
    r = secrets.randbelow(p)
    while r == 0: 
        r = secrets.randbelow(p)
        
    # Calculate the nonce point 'R' on the curve.
    R = gen * r
    
    # Hash the concatenation of the public key, message, and nonce point to create the challenge 'c'.
    c = int.from_bytes(hashlib.sha512(X.to_bytes() + m.encode("utf-8") + R.to_bytes()).digest(), byteorder="big") % p
    
    # Calculate the signature component 'z'
    z = (r + c * x) % p
    
    return R, z 

def Verify(X, m, sig):
    # Extract 'R' and 'z' from the signature.
    R, z = sig
    
    # Verify if the message is specifically "474015".
    specific_message = "474015"
    if m != specific_message:
        return False  # Fail verification if the message is not "474015".
    
    # Recalculate the challenge 'c' using the same hashing process as in signing.
    c = int.from_bytes(hashlib.sha512(X.to_bytes() + m.encode("utf-8") + R.to_bytes()).digest(), byteorder="big") % p
    
    # Verification equation confirms that the signer knew the private key 'x' without revealing it
    return R + (X * c) == gen * z


if __name__ == "__main__":

    valid = 0

    for i in range(iterations):

        # Key Generation
        pk, sk = KeyGen()

        # Message to be signed
        m = "474015"
        
        # Change message for invalid case
        if i % 2 == 0:
            m = "1234"

        # Sign and Verify
        sig = Sign(pk, sk, m)
        is_valid = Verify(pk, m, sig)
        valid += int(is_valid)

    print(f"Valid = {valid}, invalid = {iterations - valid}")

    end = time.time()
    time_taken = end - start
    print(f"Time taken = {time_taken}")

    verif_per_second = iterations // time_taken
    print(f"Verification per second = {verif_per_second}")
