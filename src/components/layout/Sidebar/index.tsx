// /components/layout/Sidebar/index.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Offcanvas } from 'react-bootstrap';
import styles from './Sidebar.module.css';
import { useSidebar } from '@/contexts/SidebarContext';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();
  
  const menuItems = [
    { name: 'Início', path: '/home', icon: 'house' },
    { name: 'Transferências', path: '/home/transferencias', icon: 'arrow-left-right' },
    { name: 'Investimentos', path: '/home/investimentos', icon: 'graph-up-arrow' },
    { name: 'Serviços', path: '/home/servicos', icon: 'grid' },
    { name: 'Cartões', path: '/home/cartoes', icon: 'credit-card' },
    { name: 'Configurações', path: '/home/configuracoes', icon: 'gear' },
  ];

  const renderMenuItems = () => (
    <>
      {menuItems.map((item) => (
        <Link 
          href={item.path}
          key={item.path}
          className={`${styles.sidebarItem} ${pathname === item.path ? styles.active : ''}`}
          onClick={closeSidebar}
        >
          <i className={`bi bi-${item.icon} me-3`}></i>
          <span>{item.name}</span>
        </Link>
      ))}
    </>
  );
  
  return (
    <>
      {/* Versão desktop do sidebar - sempre visível em telas grandes */}
      <div className={`${styles.desktopSidebar} d-none d-lg-block bg-white rounded shadow-sm p-3 h-100`}>
        {renderMenuItems()}
      </div>
      
      {/* Versão mobile do sidebar - aparece como menu deslizante */}
      <Offcanvas 
        show={isOpen} 
        onHide={closeSidebar} 
        className="bg-dark text-white"
        backdrop={true}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="fw-semibold">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {renderMenuItems()}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;