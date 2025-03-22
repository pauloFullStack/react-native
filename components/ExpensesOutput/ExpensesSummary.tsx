import { Text, View } from "react-native";
import { Expense } from "./interfarces/Expense";

const ExpensesSummary = ({ expenses, periodName }: { expenses: Expense[], periodName: string }) => {

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)

    return (
        <View>
            <Text>{periodName}</Text>
            <Text>R$ {expensesSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary;