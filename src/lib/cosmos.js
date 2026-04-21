import { CosmosClient } from "@azure/cosmos";

// Initialise the Cosmos DB client using environment variables
const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
});

// Returns the sightings container for sightings/page.js
export async function getSightingsContainer() {
    const database = client.database(process.env.COSMOS_DATABASE);
    const container = database.container(process.env.COSMOS_CONTAINER_SIGHTINGS);
    return container;
}

// Returns the creatures container for sightings/new/page.js
export async function getCreaturesContainer() {
    const database = client.database(process.env.COSMOS_DATABASE);
    const container = database.container(process.env.COSMOS_CONTAINER_CREATURES);
    return container;
}