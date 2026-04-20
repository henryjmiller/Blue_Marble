import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const container = client.database(process.env.COSMOS_DB_NAME).container("sea-level");

export async function GET() {
  const { resources } = await container.items
    .query("SELECT c.time, c.seaLevelMm FROM c ORDER BY c.time")
    .fetchAll();

  return Response.json(resources);
}
