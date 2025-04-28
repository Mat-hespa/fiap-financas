// /components/layout/Footer/index.tsx
'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container className={styles.centeredContainer}>
        <Row className="gy-4 justify-content-center">
          {/* Serviços */}
          <Col md={4} sm={6} xs={12} className={styles.footerCol}>
            <h5 className="mb-3 fw-semibold">Serviços</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className={styles.footerLink}>Conta corrente</a></li>
              <li className="mb-2"><a href="#" className={styles.footerLink}>Conta PJ</a></li>
              <li className="mb-2"><a href="#" className={styles.footerLink}>Cartão de crédito</a></li>
            </ul>
          </Col>
          
          {/* Contato */}
          <Col md={4} sm={6} xs={12} className={styles.footerCol}>
            <h5 className="mb-3 fw-semibold">Contato</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-light">0800 004 250 08</li>
              <li className="mb-2 text-light">meajuda@bytebank.com.br</li>
              <li className="mb-2 text-light">ouvidoria@bytebank.com.br</li>
            </ul>
          </Col>
          
          {/* Desenvolvido por */}
          <Col md={4} sm={12} className={styles.footerCol}>
            <div className={styles.thirdColumnContent}>
              <h5 className="mb-3 fw-semibold">Desenvolvido por Alura</h5>
              <div className="mb-3">
                <Image 
                  src="/images/Logo.png" 
                  alt="ByteBank" 
                  width={100} 
                  height={30} 
                />
              </div>
              
              <div className={styles.socialIcons}>
                <a href="#" className="me-3"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                <a href="#" className="me-3"><FontAwesomeIcon icon={faWhatsapp} size="lg" /></a>
                <a href="#"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;