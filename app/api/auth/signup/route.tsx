import { authformSchema } from "@/lib/utils";
import { generateAccessToken, generateRefreshToken, hashPassword } from "../../validator/Jwt";
import { NextResponse } from "next/server";
import connectedDB from "@/lib/connectedDb";
import UserModel from "@/model/User";

export async function POST(req: Request) {
  try {
    await connectedDB();

    const body = await req.json();
    console.log("Received signup request:", body);

    const userSignUp = authformSchema("sign-up").parse(body);

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: userSignUp.email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists. Please try signing in instead." }, { status: 409 });
    }

    // ✅ Hash the password before saving it
    const hashedPassword = await hashPassword(userSignUp.password);

    // Create New User
    const newUser = new UserModel({
      email: userSignUp.email,
      password: hashedPassword, // ✅ Corrected
      dateOfBirth: userSignUp.dateOfBirth,
      stateOfOrigin: userSignUp.stateOfOrigin,
      BVN: userSignUp.BVN,
      NIN: userSignUp.NIN,
      firstName: userSignUp.firstName,
      lastName: userSignUp.lastName,
      address: userSignUp.address
    });

    await newUser.save();

    // ✅ Corrected function name for refresh token
    const accessToken = generateAccessToken({ email: newUser.email });
    const refreshToken = generateRefreshToken({ email: newUser.email });

    return NextResponse.json({ message: "Account created successfully", token: accessToken, refreshToken }, { status: 201 });

  } catch (error: any) {
    console.error("Error in signup route:", error.message);
    return NextResponse.json({ message: "Invalid Information", error: error.message }, { status: 400 });
  }
}
