import { User, Transaction, Service } from '@/types';

const API_URL = 'http://localhost:3001';

/**
 * Busca um usuário pelo ID, com suporte para SSR e cache de revalidação.
 */
export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

/**
 * Busca transações de um usuário com ordenação por data, com suporte para SSR e cache.
 */
export async function getTransactions(userId: number): Promise<Transaction[]> {
  const response = await fetch(`${API_URL}/transactions?userId=${userId}&_sort=date&_order=desc`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
}

/**
 * Busca serviços dinâmicos utilizados pelo dashboard, com suporte para SSR e cache.
 */
export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/services`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
}

/**
 * Adiciona uma nova transação (sem suporte direto ao SSR, pois é uma operação de escrita).
 */
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

/**
 * Atualiza uma transação existente (sem suporte direto ao SSR, pois é uma operação de escrita).
 */
export async function updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
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

  const result = await response.json();
  console.log('Transaction updated successfully:', result);
  return result;
}

/**
 * Exclui uma transação pelo ID (sem suporte direto ao SSR, pois é uma operação de escrita).
 */
export async function deleteTransaction(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete transaction');
  }
}

/**
 * Busca uma transação específica pelo ID, com suporte para SSR e cache de revalidação.
 */
export async function getTransactionById(id: string): Promise<Transaction | null> {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    // Caso a resposta não seja bem-sucedida, retorna `null` ou lança um erro, dependendo do caso de uso.
    if (response.status === 404) {
      return null; // Transação não encontrada
    }
    throw new Error('Failed to fetch transaction');
  }

  return response.json();
}