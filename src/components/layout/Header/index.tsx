// /components/layout/Header/index.tsx
"use client";

import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <Navbar expand="lg" variant="dark" bg="dark" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#home">
          <Image
            src="/images/Logo.png"
            alt="ByteBank"
            width={100}
            height={30}
            priority
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className={styles.navbarCollapse}>
          <Nav className="me-auto">
            <Nav.Link href="#sobre">Sobre</Nav.Link>
            <Nav.Link href="#servicos">Serviços</Nav.Link>
          </Nav>
          
          <div className="d-flex">
            <Button className={`me-2 ${styles.openAccountBtn}`}>
              Abrir minha conta
            </Button>
            
            <Link href="/home" passHref>
              <Button variant="outline-light">Já tenho conta</Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;