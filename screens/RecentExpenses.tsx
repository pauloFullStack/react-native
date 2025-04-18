import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { Expense } from "../util/interfaces/Expense";
import { useContextExpense } from "../store/use-context";
import { useEffect, useState } from "react";
import { getExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { expenses, setExpenses } = useContextExpense();

    useEffect(() => {

        const fetchExpenses = async () => {

            setIsFetching(true);

            try {
                const expenses: any = await getExpenses();
                setExpenses(expenses);
            } catch (error) {
                setError('Não foi possível obter despesas!');
            }

            setIsFetching(false);
        }

        fetchExpenses();
    }, [])


    if(error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={() => {setError(null)}} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }


    const recentExpenses = expenses.filter((expense: Expense) => {


        const now = new Date(); // Obtém a data e hora atuais
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const dateSevenDays = getDateMinusDays(today, 7);

        if (typeof expense.date === 'string') {

            const dateAndString = expense.date as string;
            const arrayDate: any = dateAndString.split('/');
            expense.date = new Date(parseInt(arrayDate[2]), parseInt(arrayDate[1]) - 1, parseInt(arrayDate[0]));
        }

        return (expense.date > dateSevenDays) && (expense.date <= today);


    });

    return <ExpensesOutput fallbackText="Nenhuma despesa encontrada em 7 dias" expenses={recentExpenses} expensesPeriod="Ultimos 7 dias" />
}

export default RecentExpenses;