// Remove 'use client' - pages are server components by default
import { TransactionDetail } from './TransactionDetail';
import { getTransactions, getUser } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function TransactionDetailPage({ params }: { params: { id: string } }) {
  // Fetch data on the server
  try {
    const userId = 1; // Assuming a fixed user for this example
    const userData = await getUser(userId);
    const transactions = await getTransactions(userId);
    const transaction = transactions.find(t => t.id === params.id);
    
    if (!transaction) {
      notFound();
    }

    // Pass fetched data to the client component
    return <TransactionDetail 
      transaction={transaction} 
      user={userData} 
    />;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch transaction data');
  }
}