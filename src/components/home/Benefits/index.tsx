'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Benefits.module.css';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export const Benefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: "bi-gift",
      title: "Conta e cartão gratuitos",
      description: "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção."
    },
    {
      icon: "bi-cash-coin",
      title: "Saques sem custo",
      description: "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h."
    },
    {
      icon: "bi-star",
      title: "Programa de pontos",
      description: "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!"
    },
    {
      icon: "bi-laptop",
      title: "Seguro Dispositivos",
      description: "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica."
    }
  ];

  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5 fw-bold">Vantagens do nosso banco:</h2>
        
        <Row>
          {benefits.map((benefit, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <div className={`${styles.benefitCard} h-100`}>
                <i className={`bi ${benefit.icon} ${styles.benefitIcon}`}></i>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Benefits;