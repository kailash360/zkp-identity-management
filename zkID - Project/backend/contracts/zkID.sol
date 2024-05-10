// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract zkID {

  struct Proof {
    string vector;
    address verifier;
    uint256 timestamp;
  }

  mapping (address => Proof) public proofs;

  event ZkID(string);

  constructor() {
    emit ZkID("Contract deployed");
  }

  function addProof (string memory _proof, address _verifier) payable public returns (Proof memory proof) {
    
    Proof memory newProof;
    newProof.vector = _proof;
    newProof.verifier = _verifier;
    newProof.timestamp = block.timestamp;

    proofs[msg.sender] = newProof;

    return newProof;
  }

  function getProof (address _user) public view returns (Proof memory proof){
    Proof memory _proof = proofs[_user];

    return _proof;
  }
  
}
