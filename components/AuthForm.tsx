'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { z } from "zod"
import CustomForm from './CostomForm';
import { authformSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import SignUp from '@/app/(auth)/sign-up/page';
import { useRouter } from 'next/navigation';

// This will makesure it renders an email




const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const formSchema = authformSchema(type);
  

// Define our form: this can be with the use of the useform that will be importd and using the <z.infer<typeof formSchema>>for setting the type that will be used in the form it also lets us provide default values for the code, properties the resolver will be used to resolve any error from the user.

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
   })
  
  // The next thing we have to define is the submit handler, this is what will hadle the submit button once the user clicks on it 
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
     
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    setisLoading(true)
    

// This try catch is used for setting up the usser signIn and SignUp, we will use it for updating the authentication for the user, through the use of Appwrite 

    try {

      if ( type === 'sign-up'){
        // const newUser = await signUp(data);
        // setUser(newUser);
      }
        
        if (type === 'sign-in'){
          // const response = await signIn({
          //   email: data.email,
          //   password: data.password
          // })
          
          if(response) router.push('/')
        }
    
    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false)
    }
     
  }
  
  return (
    <section className='auth-form'>
          <header className='flex flex-col gap-5 md:gap-6'>
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

              <div className='flex flex--col gap-1 md:gap-3'>
                  <h1 className='text-3xl lg:text-4xl font-serif text-neutral-800 font-semibold'>
                      {user
                          ? "Link Accout"
                          : type === "sign-in"
                              ? "sign-In"
                              : "sign-Up"
                      }
                    <p className='font-normal text-neutral-700'>
                          {user
                              ? "Link your Account"
                              : "Please Enter details"
                          }
                    </p>
                  </h1>
            </div>
          </header>
          
          {user ? (
              <div className='flex flex-col gap-4'>
              {/* plaidId */}
              </div>
          ) : (
                <>
                  <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {type === 'sign-up' && (
                console.log('whats it'),    
                    <>
                    {/* Name details */}
                    <div className='flex gap-4'>
                      
                    <CustomForm
                      control={form.control} name={'firstName'} label={"First Name"}
                      placeholder={'Enter your First Name'}
                    />
                    <CustomForm
                      control={form.control} name={'lastName'} label={"Last Name"}
                      placeholder={'Enter your Last Name'}
                    />
                    </div>
                    
                    {/* Date of birth & State of origin */}
                    <div className='flex gap-4'>
                      <CustomForm
                      control={form.control} name={'dateofbirth'} label={"Date of Birth (DOB)"}
                      placeholder={'YYYY / MM / DD'}
                    />
                    <CustomForm
                      control={form.control} name={'stateoforigin'} label={"State of Origin (SOB)"}
                      placeholder={'State'}
                    />
                    </div>
                      <CustomForm
                      control={form.control} name={'address'} label={"Address"}
                      placeholder={'Enter your Address'} />
                    
                  {/* BVN & NIN */}
                  <div className='flex gap-4'>
                       <CustomForm
                      control={form.control} name={'BVN'} label={"BVN"}
                      placeholder={'Enter your BVN'}
                    />
                    <CustomForm
                      control={form.control} name={'NIN'} label={"NIN"}
                      placeholder={'Enter your NIN'}
                    />
                    </div>
                  </>
                )}
                <CustomForm
                  control={form.control} name={'email'} label={"Email"}
                  placeholder={'Enter your Email'}
                />
            
                <CustomForm
                  control={form.control} name={'password'} label={'Password'}
                  placeholder={'Enter your Password'}
                />

                <div className='flex flex-col gap-4'>
                <Button type="submit" className='rounded-lg bg-blue-900 text-1.5xl text-neutral-200 font-serif p-5 hover:cursor-pointer' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' ? 'sign-In' : 'sign-Up'}  
                </Button>
                </div>
              </form>          
    </Form>

            <footer className='flex justify-center gap-1'>
              <p>{type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}</p>
              <Link href={type === 'sign-in' ? "/sign-up" : "/sign-in"} className='text-blue-700'>
                  {type === 'sign-in' ? "Sign-Up" : "Sign-In"}
              </Link>
            </footer>
            
                </>
          )}

    </section>
  );
}

export default AuthForm;
