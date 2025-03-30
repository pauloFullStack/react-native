import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../util/interfaces/Expense";
import { GlobalStyles } from "../../constants/styles";



const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }: { expenses: Expense[], expensesPeriod: string, fallbackText: string }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {expenses.length > 0 ? (
                <ExpensesList expenses={expenses} />
            ) : (
                <View style={styles.containerTextEmptyExpense}>
                    <Text style={styles.textEmptyExpense}>{fallbackText}</Text>
                </View>)}

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
    },
    textEmptyExpense: {
        fontSize: 18,
        color: '#A0A0A0'
    },
    containerTextEmptyExpense: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20
    }
})