const express = require("express");
const router = express.Router();
const { getContract } = require("../fabricClient");

// Create Agreement
router.post("/agreement", async (req, res) => {
    try {
        const { id, projectOwner, freelancer, amount, deliveryDate, paymentDate } = req.body;

        const { contract, gateway } = await getContract("admin"); // Use an enrolled Fabric identity

        await contract.submitTransaction("CreateAgreement", id, projectOwner, freelancer, amount.toString(), deliveryDate, paymentDate);
        
        await gateway.disconnect();
        res.json({ message: "Agreement created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Confirm Delivery
router.post("/confirm-delivery/:id", async (req, res) => {
    try {
        const { contract, gateway } = await getContract("admin");

        await contract.submitTransaction("ConfirmDelivery", req.params.id);

        await gateway.disconnect();
        res.json({ message: "Delivery confirmed!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Confirm Payment
router.post("/confirm-payment/:id", async (req, res) => {
    try {
        const { contract, gateway } = await getContract("admin");

        await contract.submitTransaction("ConfirmPayment", req.params.id);

        await gateway.disconnect();
        res.json({ message: "Payment confirmed!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Query Agreement Details
router.get("/agreement/:id", async (req, res) => {
    try {
        const { contract, gateway } = await getContract("admin");

        const result = await contract.evaluateTransaction("ReadAgreement", req.params.id);

        await gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
