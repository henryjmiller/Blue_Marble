import { getEventsContainer } from "@/lib/cosmos";
import { NextResponse } from "next/server";

// Reads the partition key path from the container definition (e.g. "/id"),
// then extracts the matching value from a document so point operations work
// regardless of which partition key the container was created with.
async function getPartitionKeyValue(container, doc) {
    const { resource: def } = await container.read();
    const pkPath = def.partitionKey.paths[0].replace("/", "");
    return doc[pkPath];
}

// PUT /api/events/[id] — updates event fields (title, description, date, etc.)
export async function PUT(request, { params }) {
    const container = await getEventsContainer();
    const { id } = await params;
    const updates = await request.json();

    const { resources } = await container.items
        .query({ query: "SELECT * FROM c WHERE c.id = @id", parameters: [{ name: "@id", value: id }] })
        .fetchAll();

    const existing = resources[0];
    if (!existing) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const updated = { ...existing, ...updates };
    const pkValue = await getPartitionKeyValue(container, existing);
    await container.item(id, pkValue).replace(updated);
    return NextResponse.json(updated);
}

// DELETE /api/events/[id] — removes an event
export async function DELETE(_, { params }) {
    const container = await getEventsContainer();
    const { id } = await params;

    const { resources } = await container.items
        .query({ query: "SELECT * FROM c WHERE c.id = @id", parameters: [{ name: "@id", value: id }] })
        .fetchAll();

    const existing = resources[0];
    if (!existing) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const pkValue = await getPartitionKeyValue(container, existing);
    await container.item(id, pkValue).delete();
    return NextResponse.json({ success: true });
}

// PATCH /api/events/[id] — toggles a user's attendance on an event
export async function PATCH(request, { params }) {
    const container = await getEventsContainer();
    const { id } = await params;
    const { username } = await request.json();

    const { resources } = await container.items
        .query({ query: "SELECT * FROM c WHERE c.id = @id", parameters: [{ name: "@id", value: id }] })
        .fetchAll();

    const event = resources[0];
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const attending = event.attendees.includes(username);
    const updated = {
        ...event,
        attendees: attending
            ? event.attendees.filter((u) => u !== username)
            : [...event.attendees, username],
    };

    const pkValue = await getPartitionKeyValue(container, event);
    await container.item(id, pkValue).replace(updated);
    return NextResponse.json(updated);
}
