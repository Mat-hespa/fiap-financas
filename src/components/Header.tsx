'use client';

import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Image from 'next/image';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#home" className={styles.brand}>
          <Image 
            src="/images/Logo.png" 
            alt="ByteBank" 
            width={120} 
            height={40} 
            priority
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#sobre" className={styles.navLink}>Sobre</Nav.Link>
            <Nav.Link href="#servicos" className={styles.navLink}>Serviços</Nav.Link>
          </Nav>
          <div className={styles.buttonGroup}>
            <Button className={styles.openAccountBtn}>Abrir minha conta</Button>
            <Button className={styles.loginBtn}>Já tenho conta</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};