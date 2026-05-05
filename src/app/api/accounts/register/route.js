import { getAccountsContainer } from "@/lib/cosmos";
import { NextResponse } from "next/server";

// POST /api/accounts/register — creates a new guest account
export async function POST(request) {
    const container = await getAccountsContainer();
    const { username, password } = await request.json();

    if (!username || !password) {
        return NextResponse.json(
            { success: false, error: "Username and password are required" },
            { status: 400 }
        );
    }

    const { resources } = await container.items
        .query({
            query: "SELECT * FROM c WHERE c.username = @username",
            parameters: [{ name: "@username", value: username }],
        })
        .fetchAll();

    if (resources.length > 0) {
        return NextResponse.json(
            { success: false, error: "Username already taken" },
            { status: 409 }
        );
    }

    const newAccount = {
        id: crypto.randomUUID(),
        username,
        password,
        role: "guest",
        displayName: username,
    };

    await container.items.create(newAccount);

    return NextResponse.json({
        success: true,
        user: { username: newAccount.username, role: newAccount.role, displayName: newAccount.displayName },
    }, { status: 201 });
}
