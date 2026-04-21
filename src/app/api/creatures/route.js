import { getCreaturesContainer } from "@/lib/cosmos";
import { NextResponse } from "next/server";

// GET /api/creatures
// Fetches all creatures from Cosmos DB and returns them as JSON (they are stored as JSON too in db)
export async function GET() {
    const container = await getCreaturesContainer();

    const { resources } = await container.items
        .query("SELECT * FROM c")
        .fetchAll();

    return NextResponse.json(resources);
}