// Remove 'use client' - pages are server components by default
import { EditTransaction } from './EditTransaction';
import { getTransactions, getUser } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function EditTransactionPage({ params }: { params: { id: string } }) {
  try {
    const userId = 1; // Assuming a fixed user for this example
    const userData = await getUser(userId);
    const transactions = await getTransactions(userId);
    const transaction = transactions.find(t => t.id === params.id);
    
    if (!transaction) {
      notFound();
    }

    // Format the date for the form
    const formattedDate = new Date(transaction.date).toISOString().split('T')[0];
    
    // Pass pre-fetched data to the client component
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