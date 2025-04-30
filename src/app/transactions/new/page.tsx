import { getUser } from "@/lib/api";
import { NewTransactionForm } from "./NewTransactionForm";

export default async function AddTransactionPage() {
  // Fetch user data on the server
  const userId = 1; // Assuming fixed user for this example
  const user = await getUser(userId);
  
  // Get today's date formatted for the form's default value
  const today = new Date().toISOString().split("T")[0];
  
  return <NewTransactionForm user={user} defaultDate={today} />;
}