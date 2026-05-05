// One-time script to seed demo accounts into the Cosmos DB account-data container
// Run with: node src/scripts/seedAccounts.js

require("dotenv").config({ path: ".env.local" });
const { CosmosClient } = require("@azure/cosmos");

const ACCOUNTS = [
    { id: "1", username: "admin",     password: "admin123", role: "admin",     displayName: "Admin" },
    { id: "2", username: "moderator", password: "mod123",   role: "moderator", displayName: "Moderator" },
    { id: "3", username: "guest",     password: "guest123", role: "guest",     displayName: "Guest" },
];

async function seedAccounts() {
    const client = new CosmosClient({
        endpoint: process.env.COSMOS_ENDPOINT,
        key: process.env.COSMOS_KEY,
    });

    const container = client
        .database(process.env.COSMOS_DATABASE)
        .container("account-data");

    console.log("Seeding accounts into Cosmos DB...");

    for (const account of ACCOUNTS) {
        await container.items.upsert(account);
        console.log(`Uploaded: ${account.username}`);
    }

    console.log("Done! All accounts seeded successfully.");
}

seedAccounts().catch(console.error);
