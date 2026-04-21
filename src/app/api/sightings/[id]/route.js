import { getSightingsContainer } from "@/lib/cosmos";
import { NextResponse } from "next/server";

// GET /api/sightings/[id]
// Fetches a single sighting from Cosmos DB by its ID
export async function GET(request, { params }) {
    const container = await getSightingsContainer();

    const { resource } = await container.items
        .item(params.id, params.id)
        .read();

    // if error fetching resource
    if (!resource) {
        return NextResponse.json({ error: "Sighting not found" }, { status: 404 });
    }

    return NextResponse.json(resource);
}