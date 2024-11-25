import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {authOptions} from "@/utils/authOptions";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession({
            req: req as any,
            ...authOptions,
        });

        // @ts-ignore
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) throw new Error("Backend URL is not defined");

        const response = await fetch(`${backendUrl}/api/user/getSavedNumbers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.token}`,
            },
        });

        const data = await response.json();

        return NextResponse.json({ savedNumbers: data.savedNumbers });
    } catch (error) {
        console.error('Error fetching saved numbers:', error);
        return NextResponse.json({ error: 'Failed to fetch saved numbers' }, { status: 500 });
    }
}
