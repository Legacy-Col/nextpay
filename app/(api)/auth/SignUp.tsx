import { authformSchema } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


const users: any[] = []; 

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userData = authformSchema('sign-up').parse(body);

        if (users.some((user) => user.email === userData)) {
            return NextResponse.json({message: 'Account already exist!'}, {status: 400})
        }
    } catch (error) {
        
    }
}