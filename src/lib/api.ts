import { User, Transaction, Service } from '@/types';

const API_URL = 'http://localhost:3001';

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export async function getTransactions(userId: number): Promise<Transaction[]> {
  const response = await fetch(`${API_URL}/transactions?userId=${userId}&_sort=date&_order=desc`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
}

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/services`);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add transaction');
  }
  return response.json();
}

export async function updateTransaction(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update transaction');
  }

  // Only read the response once and store the result
  const result = await response.json();
  console.log('Transaction updated successfully:', result);
  return result;
}

export async function deleteTransaction(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete transaction');
  }
}