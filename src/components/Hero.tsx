'use client';

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <Container>
        <Row className="align-items-center">
          {/* Texto à esquerda no desktop, acima da imagem em mobile */}
          <Col lg={6} className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Experimente mais liberdade no controle da sua vida financeira.
            </h1>
            <h2 className={styles.heroSubtitle}>
              Crie sua conta com a gente!
            </h2>
            <div className={styles.heroButtons}>
            </div>
          </Col>
          
          {/* Imagem à direita no desktop, abaixo do texto em mobile */}
          <Col lg={6} className={styles.heroImage}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/banner.svg"
                alt="Uma pessoa ao lado de um gráfico financeiro crescente"
                fill
                style={{objectFit: 'contain'}}
                priority
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};