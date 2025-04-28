export interface User {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
}

export interface Transaction {
  id: number;
  userId: number;
  type: "deposit" | "transfer" | "payment";
  description: string;
  amount: number;
  date: string;
}

export interface Service {
  id: number;
  name: string;
  icon: string;
}
