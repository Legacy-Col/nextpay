'use client'

import React from 'react';
import { MobileMenuProps } from '@/types';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constatnts';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


const Mobilemenu = ({user} : MobileMenuProps) => {
    const pathname = usePathname()
  return (
    <section className='w-fulll max-w-[264px]'>
    <Sheet>
            <SheetTrigger>
                <Image
                    src="/icons/menu2.png"
                    alt='menu btn'
                    width={30}
                    height={30}
                    className='cursor-pointer'  
                />      
            </SheetTrigger>
        <SheetContent side='left'>
            <Link
                  href="/"
                  className='mb-12 cursor-pointer flex gap-2 items-center mx-4 my-2'>
                <Image
                    src="/icons/pay.png"
                    alt='Nextpay'
                    width={30}
                    height={30}
                    className='size-8 max-xl:size-10'
                />
                <h1 className='text-2xl font-serif '>Nextpay</h1>
              </Link>
                  <div className='mobilenav-sheet'>
                      <SheetClose asChild>
                          <nav className='flex h-full flex-col gap-6'>
                              
                              {sidebarLinks.map((item) => {
                                const isActive = pathname === item.route || pathname.startsWith(`${item.route}`)
                  return (
                    <SheetClose asChild key={item.route}>    
                      <Link
                          href={item.route}
                          key={item.label}
                          className={cn ('mobilenav-sheet_close', {"bg-blue-500 text-neutral-800 rounded-lg p-4" : isActive})}
                      >
                          <Image
                              src={item.imgURL}
                              alt={item.label}
                              width={30}
                              height={30}
                              className=''
                          />
                          <p className={cn("text-1xl font-serif text-neutral-700", {"text-neutral-200" : isActive})}>{ item.label}</p>
                      </Link>
                    </SheetClose>
                  )
              })
                              }     
                              
                              USER
                          </nav>
                      </SheetClose>

                      FOOTER
                    </div>
        </SheetContent>
    </Sheet>
    </section>
  );
}

export default Mobilemenu;
