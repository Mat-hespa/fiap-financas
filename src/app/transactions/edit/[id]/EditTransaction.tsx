"use client";

import { useEffect, useState } from "react";
import { getTransactions, updateTransaction, getUser } from "@/lib/api";
import { Transaction, User } from "@/types";
import { useRouter } from "next/navigation";
import { HeaderTransaction } from "@/components/layout/HeaderTransaction";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";

export function EditTransaction({ id }: { id: string }) {
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    amount: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = 1; // Assumindo usuário fixo para este exemplo
        console.log("Fetching user data for ID:", userId);
        const userData = await getUser(userId);
        console.log("Fetching transactions");
        const transactions = await getTransactions(userId);
        console.log("Looking for transaction with ID:", id);
        const foundTransaction = transactions.find((t) => t.id === id);

        setUser(userData);
        console.log("Found transaction:", foundTransaction);

        if (foundTransaction) {
          setTransaction(foundTransaction);

          // Formatar a data para o input date
          const date = new Date(foundTransaction.date);
          const formattedDate = date.toISOString().split("T")[0];
          console.log("Setting form data with transaction:", {
            type: foundTransaction.type,
            description: foundTransaction.description,
            amount: String(Math.abs(foundTransaction.amount)),
            date: formattedDate,
          });

          setFormData({
            type: foundTransaction.type,
            description: foundTransaction.description,
            amount: String(Math.abs(foundTransaction.amount)),
            date: formattedDate,
          });
        } else {
          console.error("Transaction not found with ID:", id);
          setError("Transação não encontrada");
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
        setError("Erro ao buscar detalhes da transação");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(`Form field changed: ${name} = ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setIsSubmitting(true);
    setError("");

    try {
      if (!transaction) {
        console.error("Transaction is null when trying to update");
        throw new Error("Transação não encontrada");
      }

      const amount = parseFloat(formData.amount);
      console.log("Parsed amount:", amount);

      if (isNaN(amount) || amount <= 0) {
        console.error("Invalid amount:", amount);
        throw new Error("Por favor, insira um valor válido");
      }

      // Ajuste o valor baseado no tipo de transação
      const adjustedAmount = formData.type === "deposit" ? amount : -amount;
      console.log("Adjusted amount based on transaction type:", adjustedAmount);

      const transactionId = transaction.id;
      const updateData = {
        type: formData.type,
        description: formData.description,
        amount: adjustedAmount,
        date: new Date(formData.date).toISOString(),
      };
      
      console.log("Updating transaction with ID:", transactionId);
      console.log("Update payload:", updateData);
      
      try {
        const result = await updateTransaction(transactionId, updateData);
        console.log("Update API response:", result);
        console.log("Transaction updated successfully, navigating to /transactions");
        router.push("/transactions");
      } catch (apiError) {
        console.error("API error during update:", apiError);
        console.log("API error details:", JSON.stringify(apiError));
        throw apiError;
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      if (err instanceof Error) {
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
      }
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao editar a transação"
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
        <span>Carregando dados...</span>
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
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Editar Transação</h5>
                </div>

                <div className="card-body">
                  {error && !transaction && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  {transaction ? (
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

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
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">
                          Valor (R$)
                        </label>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          className="form-control"
                          step="0.01"
                          min="0.01"
                          required
                        />
                        <div className="form-text">
                          Para transferências, o valor será marcado como
                          negativo automaticamente.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                          Data
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="d-flex gap-2 mt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-success"
                          onClick={() => console.log("Submit button clicked")}
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
                            "Atualizar Transação"
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            console.log("Cancel button clicked");
                            router.push("/transactions");
                          }}
                          className="btn btn-outline-secondary"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-5">
                      <div className="alert alert-danger mb-3" role="alert">
                        {error || "Transação não encontrada"}
                      </div>
                      <button
                        onClick={() => router.push("/transactions")}
                        className="btn btn-primary"
                      >
                        Voltar para Transações
                      </button>
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