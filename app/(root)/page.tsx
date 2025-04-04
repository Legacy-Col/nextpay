'use client'

import BalanceBox from '@/components/BalanceBox';
import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import React, { useEffect, useState } from 'react';
import LoggedUser from '@/components/LoggedUser';
import { showToast } from '@/components/Animatedtoast';

interface UserSummary {
  firstName: string;
  lastName: string;
  email: string
}


const Home = () => {

  const [user, setUser] = useState<UserSummary | null>(null);
  const [logging, setLogging] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/user")
        if (!response.ok) {
          throw new Error("Fialed to get user Data")
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        showToast("Failed to get User Data", "error")
      } finally {
        setLogging(false);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    if (logging) {
      showToast("User Logged In", "success")
    }

  }, []);

  return user ? (

    <LoggedUser />

  ) : (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={'Guest'}
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
        user={"Guest"}
        transactions={[]}
        banks={[{ totalCurrentBalance: 1700 }, { totalCurrentBalance: 2000 }]}
      />
    </section>
  );
}

export default Home;
