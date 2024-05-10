import hashlib
import time

start = time.time()

def hash_it(data):
    return hashlib.sha256(data).digest()

age_actual = 90
age_to_prove = 18
seed = b"000abc"

# Initial hash
proof = hash_it(seed)

# Generating the proof by hashing age_actual - age_to_prove times
for i in range(age_actual - age_to_prove):
    proof = hash_it(proof)

# Generating encrypted_age by hashing for age_actual times
encrypted_age = hash_it(seed)
for _ in range(age_actual):
    encrypted_age = hash_it(encrypted_age)

verified_age = proof

# Trying to reverse the hash age_to_prove times to match encrypted_age
for _ in range(age_to_prove):
    verified_age = hash_it(verified_age)

print("Proof:\t\t", hashlib.sha256(proof).hexdigest())
print("Encr Age:\t", hashlib.sha256(encrypted_age).hexdigest())
print("Verified Age:\t", hashlib.sha256(verified_age).hexdigest())

is_valid = hashlib.sha256(encrypted_age).hexdigest() == hashlib.sha256(verified_age).hexdigest()
print(f"Valid = {is_valid}")


end = time.time()
time_taken = end - start
print(f"Time taken = {time_taken}")

verif_per_second = 1 / time_taken
print(f"Verifications per second = {verif_per_second}")
