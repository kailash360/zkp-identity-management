const zkID = artifacts.require("zkID");

module.exports = function (deployer) {
  deployer.deploy(zkID);
};
