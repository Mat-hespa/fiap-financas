"use client";

import { useState, useEffect } from "react";
import { addTransaction, getUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { HeaderTransaction } from "@/components/layout/HeaderTransaction";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { User } from "@/types";
import Link from "next/link";

export default function AddTransactionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "deposit",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userId = 1; // Assumindo que o userId é 1 para este exemplo
        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const amount = parseFloat(formData.amount);

      if (isNaN(amount) || amount <= 0) {
        throw new Error("Por favor, insira um valor válido");
      }

      // Ajuste o valor baseado no tipo de transação
      const adjustedAmount = formData.type === "deposit" ? amount : -amount;

      await addTransaction({
        userId: 1,
        type: formData.type,
        description: formData.description,
        amount: adjustedAmount,
        date: new Date(formData.date).toISOString(),
      });

      router.push("/transactions");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao adicionar a transação"
      );
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-success me-2" role="status" />
        <span>Carregando...</span>
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
              <div className="card shadow-sm">
                <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center py-3 gap-2">
                  <h5 className="mb-0">Nova Transação</h5>
                </div>

                <div className="card-body">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="type" className="form-label">
                        Tipo de Transação
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="deposit">Depósito</option>
                        <option value="transfer">Transferência</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Descrição
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">
                        Valor (R$)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        step="0.01"
                        min="0.01"
                        required
                      />
                      <div className="form-text">
                        Para transferências, o valor será marcado como negativo
                        automaticamente.
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="date" className="form-label">
                        Data
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm text-white me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Salvando...
                          </>
                        ) : (
                          "Salvar Transação"
                        )}
                      </button>

                      <Link
                        href="/transactions"
                        className="btn btn-outline-secondary"
                      >
                        Cancelar
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </SidebarProvider>
  );
}
