import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { Expense } from "../util/interfaces/Expense";
import { useContextExpense } from "../store/use-context";

const RecentExpenses = () => {

    const { expenses } = useContextExpense();

    const recentExpenses = expenses.filter((expense: Expense) => {


        const now = new Date(); // Obtém a data e hora atuais
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const dateSevenDays = getDateMinusDays(today, 7);

        if (typeof expense.date === 'string') {

            // Ver porque o campo de input de VALOR não digita tando no update quando no insert
            const dateAndString = expense.date as string;
            const arrayDate: any = dateAndString.split('/');
            expense.date = new Date(parseInt(arrayDate[2]), parseInt(arrayDate[1]) - 1, parseInt(arrayDate[0]));
        }

        return (expense.date > dateSevenDays) && (expense.date <= today);


    });

    return <ExpensesOutput fallbackText="Nenhuma despesa encontrada em 7 dias" expenses={recentExpenses} expensesPeriod="Ultimos 7 dias" />
}

export default RecentExpenses;