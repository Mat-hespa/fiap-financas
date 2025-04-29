'use client';

import { useEffect, useState } from 'react';
import { getTransactions, getUser } from '@/lib/api';
import { Transaction, User } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HeaderTransaction } from '@/components/layout/HeaderTransaction';
import { Sidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/contexts/SidebarContext';

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = 1; // Assumindo usuário fixo para este exemplo
        const userData = await getUser(userId);
        const transactions = await getTransactions(userId);
        const foundTransaction = transactions.find(t => t.id === params.id);
        
        setUser(userData);
        
        if (foundTransaction) {
          setTransaction(foundTransaction);
        } else {
          setError('Transação não encontrada');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Erro ao buscar detalhes da transação');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Math.abs(amount));
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-success me-2" role="status" />
        <span>Carregando detalhes...</span>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <>
        {user && <HeaderTransaction user={user} />}
        <div className="container py-4">
          <div className="row">
            <div className="col-lg-3 mb-4 mb-lg-0">
              <Sidebar />
            </div>
            <div className="col-lg-9">
              {error || !transaction ? (
                <div className="card shadow-sm">
                  <div className="card-body text-center py-5">
                    <div className="alert alert-danger" role="alert">
                      {error || 'Transação não encontrada'}
                    </div>
                    <button
                      onClick={() => router.push('/transactions')}
                      className="btn btn-primary"
                    >
                      Voltar para Transações
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card shadow-sm">
                  <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Detalhes da Transação</h5>
                  </div>
                  <div className="card-body">
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h6 className="text-muted mb-1">ID da Transação</h6>
                        <p className="mb-3 fs-5">{transaction.id}</p>

                        <h6 className="text-muted mb-1">Tipo</h6>
                        <p className="mb-3">
                          {transaction.type === 'deposit' ? (
                            <span className="badge bg-success-subtle text-success">Depósito</span>
                          ) : (
                            <span className="badge bg-danger-subtle text-danger">Transferência</span>
                          )}
                        </p>

                        <h6 className="text-muted mb-1">Descrição</h6>
                        <p className="mb-3">{transaction.description}</p>
                      </div>

                      <div className="col-md-6">
                        <h6 className="text-muted mb-1">Valor</h6>
                        <p className={`mb-3 fs-5 fw-bold ${transaction.amount > 0 ? 'text-success' : 'text-danger'}`}>
                          {transaction.amount > 0 
                            ? `+${formatCurrency(transaction.amount)}` 
                            : `-${formatCurrency(Math.abs(transaction.amount))}`}
                        </p>

                        <h6 className="text-muted mb-1">Data e Hora</h6>
                        <p className="mb-3">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
  <Link
    href={`/transactions/edit/${transaction.id}`}
    className="btn btn-success"
  >
    <i className="bi bi-pencil me-1"></i> Editar
  </Link>
  <button
    onClick={() => router.push('/transactions')}
    className="btn btn-outline-secondary"
  >
    <i className="bi bi-arrow-left me-1"></i> Voltar para Transações
  </button>
</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </SidebarProvider>
  );
}