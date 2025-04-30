'use client';

import React, { useState } from 'react';
import { User } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card } from 'react-bootstrap';
import styles from './AccountSummary.module.css';

interface AccountSummaryProps {
  user: User;
}

export const AccountSummary: React.FC<AccountSummaryProps> = ({ user }) => {
  const [showBalance, setShowBalance] = useState(true);
  const currentDate = format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  
  return (
    <Card className={styles.accountSummaryCard}>
      <Card.Body>
        <h2 className="fs-4 fw-bold text-white mb-1">Olá, {user.name.split(' ')[0]}!</h2>
        <p className="text-white-50 mb-4">{currentDate}</p>
        
        <div className={styles.balanceSection}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-white-50 small">Saldo disponível</span>
            <button 
              className="btn btn-link p-0 text-white-50"
              onClick={() => setShowBalance(!showBalance)}
            >
              <i className={`bi bi-${showBalance ? 'eye-slash' : 'eye'}`}></i>
            </button>
          </div>
          <div className="text-white-50 small mb-2">Conta Corrente • {user.accountNumber}</div>
          <div className={styles.balanceAmount}>
            {showBalance 
              ? `R$ ${user.balance.toFixed(2).replace('.', ',')}` 
              : 'R$ ••••••'}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AccountSummary;