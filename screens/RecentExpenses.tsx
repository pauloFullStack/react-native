import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const RecentExpenses = () => {
    return <ExpensesOutput expenses={[]} expensesPeriod="Ultimos 7 dias" />
}

export default RecentExpenses;