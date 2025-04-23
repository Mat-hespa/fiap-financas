'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="gy-4">
          {/* Serviços */}
          <Col md={4} sm={6} xs={12}>
            <h5 className={styles.footerTitle}>Serviços</h5>
            <ul className={styles.footerLinks}>
              <li><a href="#">Conta corrente</a></li>
              <li><a href="#">Conta PJ</a></li>
              <li><a href="#">Cartão de crédito</a></li>
            </ul>
          </Col>
          
          {/* Contato */}
          <Col md={4} sm={6} xs={12}>
            <h5 className={styles.footerTitle}>Contato</h5>
            <ul className={styles.footerLinks}>
              <li>0800 004 250 08</li>
              <li>meajuda@bytebank.com.br</li>
              <li>ouvidoria@bytebank.com.br</li>
            </ul>
          </Col>
          
          {/* Desenvolvido por */}
          <Col md={4} sm={12}>
            <h5 className={styles.footerTitle}>Desenvolvido por Alura</h5>
            <div className={styles.footerLogo}>
              <Image 
                src="/bytebank-logo.png" 
                alt="ByteBank" 
                width={120} 
                height={40} 
              />
            </div>
            
            <div className={styles.socialIcons}>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a>
              <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};