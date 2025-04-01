'use server'
import { SignInProps, SignUpParams } from '@/types';
import { createAdminClient, createSessionClient } from '../Appwrite';
import { ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { parseStringify } from '../utils';
import { parse } from 'path';




export const signIn = async ({ email, password }: SignInProps) => {
  try {

    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password)
    return parseStringify(response)
  } catch (error) {
    console.error('Error', error)
  }
}

// Server Action to carryout either muttations of data fetching
export const signUp = async (userData: SignUpParams) => {

  const { email, password, firstName, lastName } = userData

  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount)
  } catch (error) {
    console.error('Error', error)
  }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user)
  } catch (error) {
    return null
  }
}


// Simulated database (Replace with actual DB query)

// export async function POST(req: Request) {
//   console.log("whats the error")
//   try {
//     connectedDB();
//     const body = await req.json(); console.log()
//     const userLogin = authformSchema("sign-up").parse(body);

//     const user = await UserModel.find({ email: userLogin.email });
//     if (!user) {
//       return NextResponse.json({ message: "No account found" }, { status: 404 });
//     }

//     // Compare passwords
//     const isValidPassword = await comparePassword(userLogin.password, user.password);
//     if (!isValidPassword) {
//       return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
//     }

//     // Create New User

//     const newUser = new UserModel({
//       email: userLogin.email,
//       password: userLogin.password,
//       dateOfBirth: userLogin.dateOfBirth,
//       stateOfOrigin: userLogin.stateOfOrigin,
//       BVN: userLogin.BVN,
//       NIN: userLogin.NIN,
//       firstName: userLogin.firstName,
//       lastName: userLogin.lastName,
//       address: userLogin.address
//     })
//     await newUser.save();

//     return NextResponse.json({ message: "Account created successfully", status: 201 })

//     // Generate tokens
//     const refreshToken = generatRefreshToken({ email: user.email })
//     const accessToken = generateAccessToken({ email: user.email });

//     return NextResponse.json({ accessToken, refreshToken }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ message: "Invalid Information", error: error.message }, { status: 400 });
//   }
// }
