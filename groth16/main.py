import subprocess
import time

iterations = 10

def run_command(command, log = True):
    """Run a shell command and print its outputs."""
    try:
        # Execute the command, capture stdout and stderr
        result = subprocess.run(command, shell=True, text=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if log:
            print(f">> {command}'\n{result.stdout}")
    except subprocess.CalledProcessError as e:
        # Handle errors in the subprocess
        print(f"Error executing '{command}':\n{e.stderr}")

def main():
    
    age = int(input("Enter actual age: "))
    
    commands = [
        """zokrates compile \
            -i root.zok \
            --output .\compile\out \
            --abi-spec .\compile\\abi.json \
            --r1cs .\compile\out.r1cs
        """,
        """zokrates setup \
            --input .\compile\out \
            --proving-key-path .\keys\proving.key \
            --verification-key-path .\keys\\verification.key
        """,
        f"""zokrates compute-witness \
            --input .\compile\out \
            --output .\witness\witness \
            --abi-spec .\compile\\abi.json \
            --circom-witness .\witness\out.wtns \
            -a {age}
        """,
        """zokrates generate-proof \
            --input .\compile\out \
            --proof-path .\proof\proof.json  \
            --proving-key-path .\keys\proving.key \
            --witness .\witness\witness
        """,
        """zokrates export-verifier \
            --input .\keys\\verification.key \
            --output contract/verifier.sol
        """,
        """zokrates verify \
            --proof-path .\proof\proof.json \
            --verification-key-path .\keys\\verification.key
        """,
        """node .\script\createProofVector.js"""
    ]
    
    # Run each command in sequence
    for cmd in commands:
        run_command(cmd)
        input()
        print("==================================================")
        
    start = time.time()
    for _ in range(iterations):
        run_command(commands[5], False)
        print(_, end=" ")
    end = time.time()
    
    time_taken = end - start
    print(f"Time taken: {time_taken}")
    
    verif_per_second = iterations // time_taken
    print(f"Verification per second: {verif_per_second}")

if __name__ == "__main__":
    main()
