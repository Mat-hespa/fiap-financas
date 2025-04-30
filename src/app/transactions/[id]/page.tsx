import { TransactionDetail } from './TransactionDetail';
import { getTransactionById, getUser } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function TransactionDetailPage({ params }: { params: { id: string } }) {
  try {
    const userId = 1;
    const userData = await getUser(userId);
    
    // Usar a função específica para buscar uma transação por ID
    const transaction = await getTransactionById(params.id);
    
    if (!transaction) {
      console.error(`Transaction with ID ${params.id} not found`);
      notFound();
    }
    
    return <TransactionDetail 
      transaction={transaction} 
      user={userData} 
    />;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch transaction data');
  }
}