'use client';

import { Transaction, User } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HeaderTransaction } from '@/components/layout/HeaderTransaction';
import { Sidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { formatCurrency, formatDate } from '@/utils/formatters';

export function TransactionDetail({ 
  transaction, 
  user 
}: { 
  transaction: Transaction, 
  user: User 
}) {
  const router = useRouter();

  return (
    <SidebarProvider>
      <>
        <HeaderTransaction user={user} />
        <div className="container py-4">
          <div className="row">
            <div className="col-lg-3 mb-4 mb-lg-0">
              <Sidebar />
            </div>
            <div className="col-lg-9">
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
            </div>
          </div>
        </div>
      </>
    </SidebarProvider>
  );
}