import { getEventsContainer } from "@/lib/cosmos";
import { NextResponse } from "next/server";

// GET /api/events — returns all events sorted by date
export async function GET() {
    const container = await getEventsContainer();
    const { resources } = await container.items
        .query("SELECT * FROM c")
        .fetchAll();
    const sorted = resources.sort((a, b) => new Date(a.date) - new Date(b.date));
    return NextResponse.json(sorted);
}

// POST /api/events — creates a new event
export async function POST(request) {
    const container = await getEventsContainer();
    const body = await request.json();
    const newEvent = {
        ...body,
        id: crypto.randomUUID(),
        attendees: [],
    };
    await container.items.create(newEvent);
    return NextResponse.json(newEvent, { status: 201 });
}
