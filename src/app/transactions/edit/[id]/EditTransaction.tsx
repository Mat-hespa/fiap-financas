"use client";

import { useState } from "react";
import { updateTransaction } from "@/lib/api";
import { Transaction, User } from "@/types";
import { useRouter } from "next/navigation";
import { HeaderTransaction } from "@/components/layout/HeaderTransaction";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";

type FormData = {
  type: string;
  description: string;
  amount: string;
  date: string;
};

export function EditTransaction({ 
  transaction, 
  user, 
  initialFormData 
}: { 
  transaction: Transaction; 
  user: User;
  initialFormData: FormData;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
  
      const adjustedAmount = formData.type === "deposit" ? amount : -amount;
  
      // Criar uma data usando a parte da data do formulário
      const selectedDate = new Date(`${formData.date}T00:00:00`);
      
      // Obter a hora atual
      const now = new Date();
      
      // Combinar a data selecionada com a hora atual (mesma lógica do NewTransactionForm)
      selectedDate.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      );
      
      // Para debug
      console.log('Data selecionada no formulário:', formData.date);
      console.log('Hora atual:', now.toTimeString());
      console.log('Data combinada:', selectedDate.toISOString());
      
      const transactionId = transaction.id;
      const updateData = {
        type: formData.type,
        description: formData.description,
        amount: adjustedAmount,
        date: selectedDate.toISOString(),
      };
      
      // Log dos dados que serão enviados para a API
      console.log('Dados para atualização:', updateData);
      
      // Verificar a implementação da função updateTransaction
      await updateTransaction(transactionId, updateData);
      
      router.push("/transactions");
    } catch (err) {
      console.error("Erro ao editar transação:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao editar a transação"
      );
      setIsSubmitting(false);
    }
  };

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
                  <h5 className="mb-0">Editar Transação</h5>
                </div>

                <div className="card-body">
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
                        onClick={() => router.push("/transactions")}
                        className="btn btn-outline-secondary"
                      >
                        Cancelar
                      </button>
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