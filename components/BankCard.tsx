import React from 'react';
import { CreditCardProps } from '@/types';
import Link from 'next/link';

const BankCard = ({account, userName, showBalance = true}: CreditCardProps) => {
  return (
        <div className='flex flex-col'>
            <Link href="/" className='bank-card'>
                <div className='bank-card-content'>
                  
                </div>
            </Link>
        </div>
  );
}

export default BankCard;
