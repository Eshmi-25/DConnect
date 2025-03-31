const fs = require("fs");
const path = require("path");
const { Wallets, Gateway } = require("fabric-network");

const enrollAdmin = async () => {
    try {
        const walletPath = path.join(__dirname, "wallets");
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check if the admin identity already exists
        const identity = await wallet.get("admin");
        if (identity) {
            console.log("An identity for the admin user already exists in the wallet.");
            return;
        }

        // Load network configuration
        const ccpPath = path.resolve(__dirname, "connection-org1.json");
        const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

        // Load CA info
        const caInfo = ccp.certificateAuthorities["ca.org1.example.com"];
        const ca = new (require("fabric-ca-client"))(caInfo.url, { trustedRoots: caInfo.tlsCACerts.pem, verify: false });

        // Enroll admin
        const enrollment = await ca.enroll({ enrollmentID: "admin", enrollmentSecret: "adminpw" });

        // Create identity
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: "Org1MSP",
            type: "X.509",
        };

        await wallet.put("admin", x509Identity);
        console.log("Successfully enrolled admin and stored identity in wallet.");
    } catch (error) {
        console.error("Failed to enroll admin:", error);
    }
};

// Run the function
enrollAdmin();
