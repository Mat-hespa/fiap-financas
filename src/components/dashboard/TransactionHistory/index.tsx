// /components/dashboard/TransactionHistory/index.tsx
'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import { Transaction } from '@/types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './TransactionHistory.module.css';
import Link from 'next/link';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  // Mostrar apenas as 5 transações mais recentes
  const recentTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 5);

  // Agrupar transações por mês para melhor organização
  const groupedTransactions: Record<string, Transaction[]> = {};
  
  recentTransactions.forEach(transaction => {
    const month = format(parseISO(transaction.date), 'yyyy-MM');
    
    if (!groupedTransactions[month]) {
      groupedTransactions[month] = [];
    }
    
    groupedTransactions[month].push(transaction);
  });

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fs-5 fw-semibold m-0">Extrato</h3>
          <Link href="/transactions" className="text-decoration-none">
            Ver todas
          </Link>
        </div>
        
        {Object.keys(groupedTransactions).map(month => {
          const monthTransactions = groupedTransactions[month];
          const monthName = format(parseISO(`${month}-01`), 'MMMM', { locale: ptBR });
          
          return (
            <div key={month} className="mb-4">
              <h5 className={`${styles.transactionMonth} text-capitalize`}>{monthName}</h5>
              
              {monthTransactions.map(transaction => (
                <div key={transaction.id} className={styles.transactionItem}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className={styles.transactionDescription}>
                        <Link 
                          href={`/transactions/${transaction.id}`}
                          className="text-decoration-none text-dark"
                        >
                          {transaction.description}
                        </Link>
                      </div>
                      <div 
                        className={`${styles.transactionAmount} ${
                          transaction.amount < 0 
                            ? 'text-danger' 
                            : 'text-success'
                        }`}
                      >
                        {transaction.amount < 0 ? '-' : '+'} R$ {Math.abs(transaction.amount).toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                    <div className={styles.transactionDate}>
                      {format(parseISO(transaction.date), 'dd/MM/yyyy', { locale: ptBR })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
        
        {transactions.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-receipt fs-1 text-muted mb-3"></i>
            <p>Você ainda não possui transações</p>
          </div>
        )}
        
        <div className="d-grid gap-2 mt-4">
          <Link 
            href="/transactions/new" 
            className="btn btn-success"
          >
            <i className="bi bi-plus-circle me-2"></i>
            Nova Transação
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TransactionHistory;