import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {authOptions} from "@/utils/authOptions";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession({
            req: req as any,
            ...authOptions,
        });

        if (!session || !(session.user as { id?: string }).id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) throw new Error("Backend URL is not defined");

        const response = await fetch(`${backendUrl}/api/generate/ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json({ prediction: data.prediction });
        } else {
            return NextResponse.json({ error: "Failed to generate prediction" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error generating prediction:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
