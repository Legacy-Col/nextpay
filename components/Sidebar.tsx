'use client'

import { sidebarLinks } from '@/constatnts';
import { cn } from '@/lib/utils';
import { SiderBarProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = ({user} : SiderBarProps) => {
    const pathname = usePathname()
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
              <Link
                  href="/"
                  className='mb-12 cursor-pointer flex gap-2 items-center'>
                <Image
                    src="/icons/pay.png"
                    alt='Nextpay'
                    width={30}
                    height={30}
                    className='size-8 max-xl:size-10'
                />
                <h1 className='text-2xl font-serif '>Nextpay</h1>
              </Link>

              {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route || pathname.startsWith(`${item.route}`)
                  return (
                      <Link
                          href={item.route}
                          key={item.label}
                          className={cn ('flex items-center justify-center gap-3 p-3 group relative', {"bg-blue-500 text-neutral-800 rounded-lg p-4" : isActive})}
                      >
                          <Image
                              src={item.imgURL}
                              alt={item.label}
                              width={30}
                              height={30}
                              className=''
                          />
                          <p className='sidebar-label text-1xl'>{ item.label}</p>
                      </Link>
                  )
              })
            }
              
      </nav>
    </section>
  );
}

export default Sidebar;
