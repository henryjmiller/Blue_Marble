// Script to seed the creatures

require("dotenv").config({ path: ".env.local" });
const { CosmosClient } = require("@azure/cosmos");
const creatures = require("../data/creatures");

async function seedCreatures() {
    const client = new CosmosClient({
        endpoint: process.env.COSMOS_ENDPOINT,
        key: process.env.COSMOS_KEY,
    });

    const container = client
        .database(process.env.COSMOS_DATABASE)
        .container("creatures");

    console.log("Seeding creatures into Cosmos DB...");

    for (const creature of creatures) {
        await container.items.upsert(creature);
        console.log(`Uploaded: ${creature.name}`);
    }

    console.log("Done! All creatures seeded successfully.");
}

seedCreatures().catch(console.error);