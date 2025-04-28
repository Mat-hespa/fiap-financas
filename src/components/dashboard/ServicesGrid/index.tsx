// /components/dashboard/ServicesGrid/index.tsx
'use client';

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Service } from '@/types';
import Link from 'next/link';
import styles from './ServicesGrid.module.css';

interface ServicesGridProps {
  services: Service[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h3 className="fs-5 fw-semibold mb-4">Serviços Disponíveis</h3>
        
        <Row className="g-3">
          {services.map(service => (
            <Col lg={4} md={6} sm={6} key={service.id}>
              <Link href={`/dashboard/servicos/${service.name.toLowerCase().replace(' ', '-')}`} className="text-decoration-none">
                <div className={styles.serviceItem}>
                  <i className={`bi bi-${service.icon} ${styles.serviceIcon}`}></i>
                  <div className={styles.serviceName}>{service.name}</div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ServicesGrid;