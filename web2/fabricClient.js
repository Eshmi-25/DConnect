const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

// Load network configuration
const ccpPath = path.resolve(__dirname, "connection-org1.json");
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

// Function to get a contract instance
async function getContract(user) {
    const walletPath = path.join(process.cwd(), "wallets");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

    const network = await gateway.getNetwork("mychannel");
    const contract = network.getContract("mycontract");

    return { contract, gateway };
}

module.exports = { getContract };
