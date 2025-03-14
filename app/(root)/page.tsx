import BalanceBox from '@/components/BalanceBox';
import HeaderBox from '@/components/HeaderBox';
import React from 'react';

const Home = () => {
  const loggedIn = {
    firstName: 'Collins'
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
      </div>
    </section>
  );
}

export default Home;
