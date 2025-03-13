import BalanceBox from '@/components/BalanceBox';
import HeaderBox from '@/components/HeaderBox';
import React from 'react';

const Home = () => {
  const loggedIn = {
    firstName: 'Collins'
  }
  return (
    <section className='home'>
        <header className='home-content'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subText="View as well as Manage the funds in your account and trasactions"
          />  
        <BalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250}
        />
        </header>
    </section>
  );
}

export default Home;
