'use client';

import { use } from 'react';
import { TransactionDetail } from './TransactionDetail';
import { PageParams } from '@/types'; // Importe a nova interface

export default function TransactionDetailPage({ params }: { params: Promise<PageParams> }) {
  // Agora params é tipado como Promise<PageParams>
  const resolvedParams = use(params);
  
  // resolvedParams agora terá o tipo PageParams, então .id é seguro
  return <TransactionDetail id={resolvedParams.id} />;
}