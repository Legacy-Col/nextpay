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

// This will makesure it renders an email




const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)
  

// Define our form: this can be with the use of the useform that will be importd and using the <z.infer<typeof formSchema>>for setting the type that will be used in the form it also lets us provide default values for the code, properties the resolver will be used to resolve any error from the user.

   const form = useForm<z.infer<typeof authformSchema>>({
    resolver: zodResolver(authformSchema),
    defaultValues: {
      email: "",
    },
   })
  
  // The next thing we have to define is the submit handler, this is what will hadle the submit button once the user clicks on it 
  
   function onSubmit(values: z.infer<typeof authformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                              ? "Sign-In"
                              : "Sign-Up"
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
                <CustomForm
                  control={form.control} name={'email'} label={"Email"}
                  placeholder={'Enter your Email'}
                />
            
                <CustomForm
                  control={form.control} name={'password'} label={'Password'}
                  placeholder={'Enter your Password'}
                />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
                </>
          )}

    </section>
  );
}

export default AuthForm;
