'use client';

import React from 'react';
import { User } from '@/types';
import { Navbar, Container, Button } from 'react-bootstrap';
import styles from './HeaderTransaction.module.css';
import { useSidebar } from '@/contexts/SidebarContext';

interface HeaderTransactionProps {
  user: User;
}

export const HeaderTransaction: React.FC<HeaderTransactionProps> = ({ user }) => {
  const { openSidebar } = useSidebar();
  
  // Proteção contra user undefined ou user.name undefined
  const initials = user && user.name 
    ? user.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : '';

  return (
    <Navbar bg="dark" variant="dark" className="py-3 shadow-sm">
      <Container>
        <div>
          <Button 
            variant="link"
            className="d-lg-none text-white p-0 me-3"
            onClick={openSidebar}
            aria-label="Open menu"
          >
            <i className="bi bi-list fs-4"></i>
          </Button>
        </div>
        
        <div className="ms-auto d-flex align-items-center">
          <span className="text-white me-3">{user?.name || 'Usuário'}</span>
          <div className={styles.userAvatar}>{initials}</div>
        </div>
      </Container>
    </Navbar>
  );
};

export default HeaderTransaction;