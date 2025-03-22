import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../util/interfaces/Expense";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES: Expense[] = [
    {
        id: 'e1',
        description: 'Um par de sapatos',
        amount: 59.99,
        date: new Date('2025-03-19')
    },
    {
        id: 'e2',
        description: 'Um par de calças',
        amount: 89.29,
        date: new Date('2025-03-18')
    },
    {
        id: 'e3',
        description: 'Algumas bananas',
        amount: 5.99,
        date: new Date('2025-03-05')
    },
    {
        id: 'e4',
        description: 'Um livro',
        amount: 14.99,
        date: new Date('2025-03-17')
    },
    {
        id: 'e5',
        description: 'Outro livro',
        amount: 18.59,
        date: new Date('2025-03-06')
    },
    {
        id: 'e6',
        description: 'Um par de calças',
        amount: 89.29,
        date: new Date('2025-03-18')
    },
    {
        id: 'e7',
        description: 'Algumas bananas',
        amount: 5.99,
        date: new Date('2025-03-05')
    },
    {
        id: 'e8',
        description: 'Um livro',
        amount: 14.99,
        date: new Date('2025-03-17')
    },
    {
        id: 'e9',
        description: 'Outro livro',
        amount: 18.59,
        date: new Date('2025-03-06')
    }
]

const ExpensesOutput = ({ expenses, expensesPeriod }: { expenses: Expense[], expensesPeriod: string }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    );
}

export default ExpensesOutput;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    }
})