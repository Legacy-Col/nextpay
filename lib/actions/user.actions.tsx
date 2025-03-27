'use server'
import { SignInProps, SignUpParams } from '@/types';
import { createAdminClient, createSessionClient } from '../../Bin/Appwrite';
import { ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { parseStringify } from '../utils';
import { parse } from 'path';




export const signIn = async ({email, password}:SignInProps) => {
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
    
    const {email, password, firstName, lastName} = userData

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
