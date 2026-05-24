const express = require("express");

const app = express();

app.use(express.json());

/**
 * GitHub Marketplace Webhook Endpoint
 */
app.post("/webhook", async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const payload = req.body;

    console.log("=================================");
    console.log("GitHub Webhook Event Received");
    console.log("Event:", event);

    // Marketplace Events
    if (event === "marketplace_purchase") {
      console.log("Marketplace Action:", payload.action);

      const account = payload.marketplace_purchase.account?.login;
      const plan = payload.marketplace_purchase.plan?.name;

      console.log("Account:", account);
      console.log("Plan:", plan);

      switch (payload.action) {
        case "purchased":
          console.log("New subscription created");
          break;

        case "changed":
          console.log("Subscription plan changed");
          break;

        case "cancelled":
          console.log("Subscription cancelled");
          break;

        case "pending_change":
          console.log("Pending change created");
          break;

        case "pending_change_cancelled":
          console.log("Pending change cancelled");
          break;

        default:
          console.log("Unknown marketplace event");
      }
    }

    console.log("=================================");

    return res.status(200).json({
      success: true,
      received: true,
    });
  } catch (error) {
    console.error("Webhook Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("GitHub Marketplace Webhook Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});