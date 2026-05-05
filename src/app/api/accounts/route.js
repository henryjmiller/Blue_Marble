import { getAccountsContainer } from "@/lib/cosmos";
import { NextResponse } from "next/server";

// POST /api/accounts — validates login credentials against account-data container
export async function POST(request) {
    const container = await getAccountsContainer();
    const { username, password } = await request.json();

    const { resources } = await container.items
        .query({
            query: "SELECT * FROM c WHERE c.username = @username",
            parameters: [{ name: "@username", value: username }],
        })
        .fetchAll();

    const user = resources[0];
    if (!user || user.password !== password) {
        return NextResponse.json(
            { success: false, error: "Invalid username or password" },
            { status: 401 }
        );
    }

    return NextResponse.json({
        success: true,
        user: { username: user.username, role: user.role, displayName: user.displayName },
    });
}
