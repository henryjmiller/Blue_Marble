import { getSightingsContainer } from "@/lib/cosmos";
import { NextResponse } from "next/server";

// GET /api/sightings
// Fetches all sighting documents from Cosmos DB and returns them as JSON
export async function GET() {
    const container = await getSightingsContainer();

    const { resources } = await container.items
        .query("SELECT * FROM c WHERE c.type = 'sighting'")
        .fetchAll();

    // sort by createdAt timestamp, newest first
    const sorted = resources.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    return NextResponse.json(sorted);
}

// POST /api/sightings
// Receives a new sighting from the form, adds unique id, and saves it to Cosmos DB
export async function POST(request) {
    const container = await getSightingsContainer();

    const body = await request.json();

    const newSighting = {
        id: Date.now().toString(),
        type: "sighting",
        createdAt: new Date().toISOString(),
        // this adds the elements in the body to the new sighting
        ...body,
    };

    await container.items.upsert(newSighting);

    return NextResponse.json(newSighting, { status: 201 });
}