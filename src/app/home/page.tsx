// app/(home)/home/page.tsx
import React from 'react';
import { getUser, getTransactions, getServices } from '@/lib/api';
import { HeaderTransaction } from '@/components/layout/HeaderTransaction/index';
import { Sidebar } from '@/components/layout/Sidebar/index';
import { AccountSummary } from '@/components/dashboard/AccountSummary/index';
import { TransactionHistory } from '@/components/dashboard/TransactionHistory/index';
import { ServicesGrid } from '@/components/dashboard/ServicesGrid/index';
import styles from '@/components/Dashboard.module.css';

// Usando SSR para dados dinâmicos do usuário e transações
export const dynamic = 'force-dynamic';

async function HomePage() {
  // Para um app real, o ID do usuário viria da sessão autenticada
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
                {/* Add mb-4 mb-lg-0 class to add bottom margin on mobile only */}
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