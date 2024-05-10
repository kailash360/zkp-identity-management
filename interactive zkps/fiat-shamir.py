import hashlib
import secrets
import time

iterations = 10000
start = time.time()

# Hash data and convert to an integer
def hash_to_int(data):
    return int(hashlib.sha256(data).hexdigest(), 16)

def fiat_shamir_protocol(n, v, s):
    """Fiat-Shamir protocol demonstration."""
    # Step 1: The prover picks a random r and sends x = r^2 mod n
    r = secrets.randbelow(n)
    x = pow(r, 2, n)
    
    # Step 2: The prover simulates the verifier's challenge
    e = hash_to_int(str(x).encode()) % 2  # Challenge, e: 0 or 1
    
    # Step 3: The prover sends the response y = r * s^e mod n
    y = r * pow(s, e, n)
    
    # Verification: The verifier checks that y^2 = x * v^e mod n
    return pow(y, 2, n) == x * pow(v, e, n)

if __name__ == "__main__":

    valid = 0

    for i in range(iterations):
        # Example usage:
        n = 3233  # n is the product of two primes, p=61 and q=53
        s = 1234  # The secret value, chosen for the example
        v = pow(s, 2, n)  # The public value, s^2 mod n

        if i % 2 == 0:
            n = 2 #variating for invalid cases

        is_valid = fiat_shamir_protocol(n, v, s)
        
        valid += int(is_valid)
    
    print(f"Valid = {valid}, Invalid = {iterations - valid}")
    
    end = time.time()
    time_taken = end - start
    print(f"Time taken: {time_taken}")
    
    verif_per_second = iterations // time_taken
    print(f"Verification per second: {verif_per_second}")
