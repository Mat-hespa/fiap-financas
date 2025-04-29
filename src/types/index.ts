// types/index.ts
export interface User {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
}

export interface Transaction {
  id: string;
  userId: number;
  type: string;
  description: string;
  amount: number;
  date: string;
}

export interface Service {
  id: number;
  name: string;
  icon: string;
}