import { authformSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { generateAccessToken, generatRefreshToken, comparePassword } from "../../validator/Jwt";
import connectedDb from "@/lib/connectedDb";
import User from "@/model/User";


export async function POST(req: Request) {
    await connectedDb();
    try {
        const body = await req.json();
        console.log("Recieved Sign-in request:", body);

        const userLoggin = authformSchema("sign-in").parse(body);
        console.log("Login Data:", userLoggin)

        // Find user in our DB
        const user = await User.findOne({ email: userLoggin.email });
        if (!user) {
            console.log("userData:", userLoggin.email);
            return NextResponse.json({ message: "No account found" }, { status: 404 });
        }

        // Password Validation
        console.log("Checking  Password:", user.email);
        const isValidPassword = await comparePassword(userLoggin.password, user.password);
        if (!isValidPassword) {
            console.log("Wrong password:", user.email);
            return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
        }

        //Token Generation
        const accessToken = generateAccessToken({ email: user.email });
        const refreshToken = generatRefreshToken({ email: user.email });

        console.log("Login Success:", { email: user.email });

        return NextResponse.json({ accessToken, refreshToken }, { status: 200 });

    } catch (error: any) {
        console.log("Sign Inerror:", error.message);
        return NextResponse.json({ message: "Invalid Information", error: error.message }, { status: 400 });
    }
}
