import BalanceBox from '@/components/BalanceBox';
import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import React from 'react';

const Home = () => {
  const loggedIn = {
    firstName: 'Collins',
    lastName: 'Legacy',
    email: 'nwosucollins35@gmail.com'
  }
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subText="View as well as Manage the funds in your account and trasactions"
          />  
          <BalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.45}
          />
        </header>

      RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{}, {}]}
      />
    </section>
  );
}

export default Home;
