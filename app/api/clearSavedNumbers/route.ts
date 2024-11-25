import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {authOptions} from "@/utils/authOptions";

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession({
            req: req as any,
            ...authOptions,
        });
        // @ts-expect-error hotfix for td
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) throw new Error("Backend URL is not defined");

        const response = await fetch(`${backendUrl}/api/saveNumbers`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.token}`,
            },
        });

        if (response.ok) {
            return NextResponse.json({ message: 'Saved numbers cleared successfully' });
        } else {
            return NextResponse.json({ error: "Failed to generate prediction" }, { status: 500 });
        }

    } catch (error) {
        console.error('Error clearing saved numbers:', error);
        return NextResponse.json({ error: 'Failed to clear saved numbers' }, { status: 500 });
    }
}
