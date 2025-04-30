import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className="bg-dark text-white py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className={`mb-4 mb-lg-0 ${styles.heroTextCol}`}>
            <h1 className={`${styles.heroTitle} mb-3`}>
              Experimente mais liberdade no controle da sua vida financeira.
            </h1>
            <h2 className="fs-4 mb-4 fw-light">
              Crie sua conta com a gente!
            </h2>
          </Col>
          
          <Col lg={6}>
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

export default Hero;