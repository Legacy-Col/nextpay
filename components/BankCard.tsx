import React from 'react';
import { CreditCardProps } from '@/types';
import { formatAmount } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const BankCard = ({account, userName, showBalance = true}: CreditCardProps) => {
  return (
        <div className='flex flex-col'>
            <Link href="/" className='bank-card'>
                <div className='bank-card_content'>
                  <div>
                      <h1 className='text-1xl font-semibold font-serif text-neutral-50'>{account.name || userName}</h1>
                      <p className='text-neutral-50 text-1.5xl font-serif'>{ formatAmount(account.totalCurrentBalance)}</p>
                  </div>
                  <article className='flex flex-col gap-2'>
                      <div className='flex justify-between'>
                          <h1 className='text-1xl font-serif text-neutral-100'>{userName }</h1>
                          <h2 className='text-1xl font-serif text-neutral-100'>●● / ●●</h2>
                      </div>
                      <p className='font-serif tracking-light text-neutral-200 text-1xl'>
                          ●●●● ●●●● ●●●● <span className='text-1xl'>{2345}</span>
                      </p>
                  </article>
                </div>

              <div className='bank-card-icon'>
                <Image 
                      src="/icons/contactpay.png"
                      alt='pay'
                      width={50}
                      height={20}
                  />
                <Image
                  src="/icons/mastercard.png"
                  alt='master'
                  width={40}
                  height={20}
                />
            </div>
              <Image 
                src="/icons/lines.png"
                alt='lines'
                width={316}
                height={190}
                className='absolute top-0 left-0'
              />
            </Link>
        </div>
  );
}

export default BankCard;
