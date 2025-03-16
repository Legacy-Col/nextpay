'use client'

import { sidebarLinks } from '@/constatnts';
import { SiderBarProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Sidebar = ({ user }: SiderBarProps) => {
    const pathname = usePathname();

  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className='mb-12 cursor-pointer items-center gap-2 flex'>
                <Image
                    src="/icons/pay.png"
                    width={34}
                    height={34}
                    alt='NextPay'
                    className='size-[24px] max-xl:size-14'  
                  />
                  <h1 className='logo'>Nextpay</h1>
              </Link> 

              {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route ||pathname.startsWith(`${item.route}/`)
                  return (
                      <Link href={item.route} key={item.label}
                          className={cn ("flex items-center p-3 gap-3 group justify-center", {'bg-blue-600 rounded-lg flex items-center justify-center p-3': isActive })}
                      >

                          <div className='size-6 '>
                                <Image 
                                  src={item.imgURL}
                                  alt={item.label}
                                  width={30}
                                  height={30}
                                  className='absolute transition-all duration-300'
                              />
                              <p className='sidebar-label-2 lg:flex'>
                                  {item.label}
                              </p>
                          </div>
                    </Link>
                )
            })}  
        </nav>
    </section>
  );
}

export default Sidebar;
