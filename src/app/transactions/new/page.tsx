import { getUser } from "@/lib/api";
import { NewTransactionForm } from "./NewTransactionForm";

export default async function AddTransactionPage() {
  const userId = 1;
  const user = await getUser(userId);
  
  const today = new Date().toISOString().split("T")[0];
  
  return <NewTransactionForm user={user} defaultDate={today} />;
}