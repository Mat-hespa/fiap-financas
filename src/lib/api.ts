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