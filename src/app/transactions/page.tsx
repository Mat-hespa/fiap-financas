"use client";

import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction, getUser } from "@/lib/api";
import { Transaction, User } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeaderTransaction } from "@/components/layout/HeaderTransaction";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { formatCurrency, formatDate } from "@/utils/formatters";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [user, setUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = 1;
        const userData = await getUser(userId);
        const data = await getTransactions(userId);
        setUser(userData);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta transação?")) {
      try {
        await deleteTransaction(id);
        setTransactions(transactions.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };
  
  const filteredTransactions = transactions.filter((item) => {
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesSearch =
      !searchTerm ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const deposits = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const transfers = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-success me-2" role="status" />
        <span>Carregando transações...</span>
      </div>
    );
  }

  const MobileTransactionCard = ({
    transaction,
  }: {
    transaction: Transaction;
  }) => (
    <div className="card mb-2 border-0 shadow-sm">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted small">
            {formatDate(transaction.date)}
          </span>
          {transaction.type === "deposit" ? (
            <span className="badge bg-success-subtle text-success">
              Depósito
            </span>
          ) : (
            <span className="badge bg-danger-subtle text-danger">
              Transferência
            </span>
          )}
        </div>
        <p className="mb-1 text-truncate">{transaction.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span
            className={`fw-bold ${
              transaction.amount > 0 ? "text-success" : "text-danger"
            }`}
          >
            {transaction.amount > 0
              ? `+${formatCurrency(transaction.amount)}`
              : `-${formatCurrency(Math.abs(transaction.amount))}`}
          </span>
          <div className="d-flex gap-1">
            <Link
              href={`/transactions/${transaction.id}`}
              className="btn btn-sm btn-outline-success"
            >
              <i className="bi bi-eye"></i>
            </Link>
            <Link
              href={`/transactions/edit/${transaction.id}`}
              className="btn btn-sm btn-outline-success"
            >
              <i className="bi bi-pencil"></i>
            </Link>
            <button
              onClick={() => handleDelete(transaction.id)}
              className="btn btn-sm btn-outline-danger"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">Saldo Total</h5>
                      <h2
                        className={
                          balance >= 0 ? "text-success" : "text-danger"
                        }
                      >
                        {formatCurrency(balance)}
                      </h2>
                      <p className="text-muted">
                        Atualizado em {new Date().toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title mb-3">Resumo</h5>
                      <div className="row g-2">
                        <div className="col-4">
                          <p className="mb-1 fs-6 text-nowrap">Depósitos:</p>
                          <h6 className="text-success">
                            {formatCurrency(deposits)}
                          </h6>
                        </div>
                        <div className="col-4">
                          <p className="mb-1 fs-6 text-nowrap">Gastos:</p>
                          <h6 className="text-danger">
                            {formatCurrency(Math.abs(transfers))}
                          </h6>
                        </div>
                        <div className="col-4">
                          <p className="mb-1 fs-6 text-nowrap">Total:</p>
                          <h6>{transactions.length}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center py-3 gap-2">
                  <h5 className="mb-0">Histórico de Transações</h5>
                  <Link
                    href="/transactions/new"
                    className="btn btn-success btn-sm"
                  >
                    <i className="bi bi-plus-lg me-1"></i> Nova Transação
                  </Link>
                </div>

                <div className="card-body">
                  <div className="row g-3 mb-3">
                    {!isMobile && (
                      <div className="col-md-8">
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-search"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Pesquisar por descrição..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    <div className={isMobile ? "col-12" : "col-md-4"}>
                      <select
                        className="form-select"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                      >
                        <option value="all">Todos os tipos</option>
                        <option value="deposit">Depósitos</option>
                        <option value="transfer">Transferências</option>
                      </select>
                    </div>
                  </div>

                  {filteredTransactions.length === 0 ? (
                    <div className="text-center py-4">
                      <i
                        className="bi bi-inbox text-muted"
                        style={{ fontSize: "2rem" }}
                      ></i>
                      <p className="mt-2 mb-0">Nenhuma transação encontrada</p>
                      <small className="text-muted">
                        {searchTerm || typeFilter !== "all"
                          ? "Tente ajustar seus filtros para ver mais resultados."
                          : "Comece adicionando uma nova transação."}
                      </small>
                    </div>
                  ) : isMobile ? (
                    <div className="transaction-cards">
                      {filteredTransactions.map((transaction) => (
                        <MobileTransactionCard
                          key={transaction.id}
                          transaction={transaction}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Data</th>
                            <th>Tipo</th>
                            <th>Descrição</th>
                            <th className="text-end">Valor</th>
                            <th className="text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td>{formatDate(transaction.date)}</td>
                              <td>
                                {transaction.type === "deposit" ? (
                                  <span className="badge bg-success-subtle text-success">
                                    Depósito
                                  </span>
                                ) : (
                                  <span className="badge bg-danger-subtle text-danger">
                                    Transferência
                                  </span>
                                )}
                              </td>
                              <td
                                className="text-truncate"
                                style={{ maxWidth: "150px" }}
                              >
                                {transaction.description}
                              </td>
                              <td
                                className={`text-end fw-bold ${
                                  transaction.amount > 0
                                    ? "text-success"
                                    : "text-danger"
                                }`}
                              >
                                {transaction.amount > 0
                                  ? `+${formatCurrency(transaction.amount)}`
                                  : `-${formatCurrency(
                                      Math.abs(transaction.amount)
                                    )}`}
                              </td>
                              <td>
                                <div className="d-flex justify-content-center gap-1">
                                  <Link
                                    href={`/transactions/${transaction.id}`}
                                    className="btn btn-sm btn-outline-success"
                                  >
                                    <i className="bi bi-eye"></i>
                                  </Link>
                                  <Link
                                    href={`/transactions/edit/${transaction.id}`}
                                    className="btn btn-sm btn-outline-success"
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </Link>
                                  <button
                                    onClick={() =>
                                      handleDelete(transaction.id)
                                    }
                                    className="btn btn-sm btn-outline-danger"
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </SidebarProvider>
  );
}
