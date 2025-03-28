import { authformSchema } from "@/lib/utils";
// import { comparePassword, generateAccessToken, generateRefreshToken } from "@/app/(validator)/Jwt";
import { NextResponse } from "next/server";
import { generateAccessToken, generatRefreshToken, comparePassword } from "../../validator/Jwt";

const loginData: any[] = [];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userLoggin = authformSchema("sign-in").parse(body);

        const user = loginData.find((u) => u.email === userLoggin.email);
        if (!user) {
            return NextResponse.json({ message: "No account found" }, { status: 404 });
        }

        const isValidPassword = await comparePassword(userLoggin.password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
        }

        // const accessToken = generateAccessToken({ email: user.email });
        // const refreshToken = generateRefreshToken({ email: user.email });

        const accessToken = generateAccessToken({ email: user.email });
        const refreshToken = generatRefreshToken({email: user.email})

        return NextResponse.json({ accessToken, refreshToken }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Invalid Information" }, { status: 400 });
    }
}
