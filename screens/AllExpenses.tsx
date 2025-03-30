import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContextExpense } from "../store/use-context";


const AllExpenses = () => {

    const { expenses } = useContextExpense();

    return <ExpensesOutput expenses={expenses} fallbackText="Nenhuma despesa encontrada" expensesPeriod="Total" />
}

export default AllExpenses;