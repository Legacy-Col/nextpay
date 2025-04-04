import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import connectedDb from "@/lib/connectedDb";
import User from "@/model/User";




export async function GET(req: Request) {
    try {
        const userData = req.headers.get("authorization");
        if (!userData || !userData.startsWith("Bearer")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const token = userData.split("")[1];

        const decoded: any = Jwt.verify(token, process.env.JWT_SECRET_KEY!)

        if (!decoded) {
            return NextResponse.json({ message: "Invalid Token" }, { status: 404 });
        }

        await connectedDb();
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return NextResponse.json({ message: "User Not Found" }, { status: 404 })
        }

    } catch (error) {
        console.error("Error fetching UserInfo", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}