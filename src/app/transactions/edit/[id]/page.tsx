// Remove 'use client' - pages are server components by default
import { EditTransaction } from './EditTransaction';
import { getTransactionById, getUser } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function EditTransactionPage({ params }: { params: { id: string } }) {
  try {
    const userId = 1;
    const userData = await getUser(userId);
    
    // Usar a função específica para buscar uma transação por ID
    const transaction = await getTransactionById(params.id);
    
    if (!transaction) {
      console.error(`Transaction with ID ${params.id} not found`);
      notFound();
    }

    const formattedDate = new Date(transaction.date).toISOString().split('T')[0];
    
    return <EditTransaction 
      transaction={transaction} 
      user={userData}
      initialFormData={{
        type: transaction.type,
        description: transaction.description,
        amount: String(Math.abs(transaction.amount)),
        date: formattedDate
      }}
    />;
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    throw new Error('Failed to load transaction for editing');
  }
}