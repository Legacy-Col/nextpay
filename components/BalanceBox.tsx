import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';
import { BalanceBoxProps } from '@/types';


const BalanceBox = ({
  accounts = [], totalBanks, totalCurrentBalance
}: BalanceBoxProps) => {
  return (
    <section className='balance-account'>
      <div className='balance-chart'>
        <DoughnutChart accounts={accounts} />
      </div>

      <div className='flex flex-col gap-6'>
        <h1 className='header-2'>
          Bank Accounts: {totalBanks}
        </h1>
        <div className='flex flex-col gap 2'>
          <p className='balance-label'>
            Account Balance
          </p> 
            
          <div className='total-balance flex justify-center gap-2'>
              <AnimatedCounter amount={totalCurrentBalance}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BalanceBox;
