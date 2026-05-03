import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const container = client.database(process.env.COSMOS_DB_NAME).container("ocean-temperature");

export async function GET() {
  const { resources } = await container.items
    .query("SELECT c.year, c.avgTemp, c.lowerBound, c.upperBound FROM c ORDER BY c.year")
    .fetchAll();

  return Response.json(resources);
}
