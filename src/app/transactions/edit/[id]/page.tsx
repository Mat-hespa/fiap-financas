'use client';

import { use } from 'react';
import { EditTransaction } from './EditTransaction';
import { PageParams } from '@/types'; // Importe a nova interface

export default function EditTransactionPage({ params }: { params: Promise<PageParams> }) {
  // Agora params é tipado como Promise<PageParams>
  const resolvedParams = use(params);
  
  // resolvedParams agora terá o tipo PageParams, então .id é seguro
  return <EditTransaction id={resolvedParams.id} />;
}