import React from 'react';
import { getUser, getTransactions, getServices } from '@/lib/api';
import { HeaderTransaction } from '@/components/layout/HeaderTransaction/index';
import { Sidebar } from '@/components/layout/Sidebar/index';
import { AccountSummary } from '@/components/dashboard/AccountSummary/index';
import { TransactionHistory } from '@/components/dashboard/TransactionHistory/index';
import { ServicesGrid } from '@/components/dashboard/ServicesGrid/index';
import styles from '@/components/Dashboard.module.css';

export const dynamic = 'force-dynamic';

async function HomePage() {
  const userId = 1;
  const user = await getUser(userId);
  const transactions = await getTransactions(userId);
  const services = await getServices();

  return (
    <>
      <HeaderTransaction user={user} />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-8">
                <div className='mb-4'>
                  <AccountSummary user={user}/>
                </div>
                <div className="mb-4 mb-lg-0">
                  <ServicesGrid services={services} />
                </div>
              </div>
              <div className="col-lg-4">
                <TransactionHistory transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;