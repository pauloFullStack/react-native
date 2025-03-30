import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { Expense } from "../util/interfaces/Expense";
import { useContextExpense } from "../store/use-context";

const RecentExpenses = () => {

    const { expenses } = useContextExpense();

    const recentExpenses = expenses.filter((expense: Expense) => {

        const today = new Date();
        const dateSevenDays = getDateMinusDays(today, 7);
        return (expense.date > dateSevenDays) && (expense.date <= today);

    });

    return <ExpensesOutput fallbackText="Nenhuma despesa encontrada em 7 dias" expenses={recentExpenses} expensesPeriod="Ultimos 7 dias" />
}

export default RecentExpenses;