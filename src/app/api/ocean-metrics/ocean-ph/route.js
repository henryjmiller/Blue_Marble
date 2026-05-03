import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const container = client.database(process.env.COSMOS_DB_NAME).container("ocean-ph");

export async function GET() {
  const { resources } = await container.items
    .query("SELECT c.day, c.monthlyAvg FROM c WHERE c.monthlyAvg != null")
    .fetchAll();

  return Response.json(resources);
}
