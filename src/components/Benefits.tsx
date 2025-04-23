'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faMoneyBillWave, faStar, faLaptop } from '@fortawesome/free-solid-svg-icons';
import styles from './Benefits.module.css';

interface Benefit {
  icon: any;
  title: string;
  description: string;
}

export const Benefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: faGift,
      title: "Conta e cartão gratuitos",
      description: "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção."
    },
    {
      icon: faMoneyBillWave,
      title: "Saques sem custo",
      description: "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h."
    },
    {
      icon: faStar,
      title: "Programa de pontos",
      description: "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!"
    },
    {
      icon: faLaptop,
      title: "Seguro Dispositivos",
      description: "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica."
    }
  ];

  return (
    <section className={styles.benefitsSection}>
      <Container>
        <h2 className={styles.sectionTitle}>Vantagens do nosso banco:</h2>
        
        <Row>
          {benefits.map((benefit, index) => (
            <Col md={6} lg={3} key={index} className={styles.benefitCol}>
              <div className={styles.benefitCard}>
                <FontAwesomeIcon 
                  icon={benefit.icon} 
                  className={styles.benefitIcon} 
                />
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