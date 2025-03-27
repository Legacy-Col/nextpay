 'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { z } from "zod"
import CustomForm from "./CustomForm";
import { authformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {  getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";



  
const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  

    const formSchema = authformSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

const onSubmit = async (data: z.infer<typeof formSchema>) => {
  setIsLoading(true);
  console.log(data);
  setIsLoading(false);


}
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
          <Link
             href="/"
             className='cursor-pointer flex gap-1 items-center'>
             <Image
               src="/icons/pay.png"
               alt='Nextpay'
               width={30}
               height={30}
             />
             <h1 className='text-2xl font-serif '>Nextpay</h1>
           </Link>
        <div className="flex flex--col gap-1 md:gap-3">
        <h1 className="font-serif text-2xl font-semibold">
          {user
            ? 'Link Account'
            : type === 'sign-in'
              ? 'Sign In'
              :'Sign up'
          }
          <p className="font-serif ">
            {user 
              ? "Link your Account"
              : "Please enter your details"
            }
          </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div>
          {/* Plaid Id*/}
        </div>
      ) : (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {type === 'sign-up' && 
                  <>
                  <div className="flex gap-2">
                    <CustomForm 
                      control={form.control} name='firstName' label='firstName' placeholder="Enter First Name"   
                    />
                    <CustomForm 
                      control={form.control} name='lastName' label='lastName' placeholder="Enter Last Name"   
                    />
                  </div>
                    <CustomForm 
                      control={form.control} name='address' label='Address' placeholder="Enter Address"   
                  />
                  <div className="flex gap-2">
                    <CustomForm 
                      control={form.control} name='dateofbirth' label='DOB' placeholder="YYYY / MM / DD"   
                    />
                    <CustomForm 
                      control={form.control} name='stateoforigin' label='SOO' placeholder="State"   
                    />
                  </div>
                  <div className="flex gap-2">
                    <CustomForm 
                      control={form.control} name='BVN' label='BVN' placeholder="Enter BVN"   
                    />
                    <CustomForm 
                      control={form.control} name='NIN' label='NIN' placeholder="Enter NIN"   
                    />
                  </div>
                  </>
                }
                <CustomForm
                  control={form.control} name='email' label='Email' placeholder='Please Enter your Email' 
                />
                <CustomForm
                  control={form.control} name='password' label='Password' placeholder='Please Enter your Password' 
                />
                <div className="flex gap-4 flex-col">
                  <Button type="submit" className="bg-blue-600 hover:cursor-pointer" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 size={20}
                          className="animate-spin"
                        /> &nbsp;
                        Loading...
                      </>
                      ) : type === 'sign-in'
                        ? 'Sign In'
                        : 'Sign Up'
                    }
                  </Button>
                </div>
              </form>
            </Form>

            <footer className="flex gap-1 justify-center">
              <p>{
                type === 'sign-in'
                  ? "Don't have an account?"
                  : 'Account already registered'
              }</p>
              <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="text-blue-700">
                  {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
              </Link>  
            </footer>
          </>
        )}
    </section>
  );
}

export default AuthForm;

