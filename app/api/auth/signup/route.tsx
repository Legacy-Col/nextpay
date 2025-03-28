import { authformSchema } from "@/lib/utils";
import { comparePassword, generateAccessToken, generatRefreshToken } from "../../validator/Jwt";
import { NextResponse } from "next/server";

// Simulated database (Replace with actual DB query)
const loginData = [
  { email: "test@example.com", password: "$2b$10$hashedpassword" } // Replace with actual hashed password
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userLogin = authformSchema("sign-in").parse(body);

    // Find user
    const user = loginData.find((u) => u.email === userLogin.email);
    if (!user) {
      return NextResponse.json({ message: "No account found" }, { status: 404 });
    }

    // Compare passwords
    const isValidPassword = await comparePassword(userLogin.password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
    }

    // Generate tokens
    
      //   const refreshToken = generateRefreshToken({ email: user.email });  
      const refreshToken = generatRefreshToken({email: user.email})
      const accessToken = generateAccessToken({ email: user.email });

    return NextResponse.json({ accessToken, refreshToken }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Invalid Information", error: error.message }, { status: 400 });
  }
}
