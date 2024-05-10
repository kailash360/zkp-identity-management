# Zero Knowledge Proof - based Decentralized Identity Management System

This repository contains the implementation of different ZKP algorithms and codebase of a decentralized identity management system using zero knowledge proofs.

## Project Structure

The project consists of 3 main directories that are described below.

### groth16

This is the implementation of the Groth16 algorithm using Zokrates. It takes a secret input from the user and generates a proof and a verifier contract file.

**Setup**
- Refer to [this documentation](https://zokrates.github.io/gettingstarted.html#installation) add Zokrates in the local environment.
- Run the following command to execute the Groth16 scheme
```
python main.py
```

### interactive zkp

This folder contains the implementation of other interactive ZKP schemes. Each file is independently executable. 

**Setup**
Use the following command to run any of the schemes
```
python <filename>.py
```

### zkID -Project

This is the decentralized identity management system that provides a user interface to create a proof for any user attribute. This proof can be used to verify the statement of the user for the specific attribute.

**Structure**

- The project contains both backend side code and frontend side implementation
- The backend side code provides with REST APIs to interact with the blockchain network built on Ganache. In the backend code, the entire Groth16 implementation is executed when a new proof is generated and is stored for the user. It also provides the API endpoint to verify the validity of the proof
- The frontend code provides the interface to interact with the blockchain and create a new proof on the prover side, and generate a new proof on the verifier side

**Setup**
- Install the dependencies in both frontend and backend by migrating to thwir folders and running the following commands in each of them
    ```
    npm install
    ```


- To start the backend, migrate to the backend folder and run the following command
    ```
    node server.js
    ```

- To start the frontend, open a new terminal window and migrate to the frontend folder. run the following command.
    ```
    npm run dev
    ```