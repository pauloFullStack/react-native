import { FlatList } from "react-native";
import { Expense } from "../../util/interfaces/Expense";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = (itemData: { item: Expense }) => <ExpenseItem {...itemData.item} />

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
    return <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id ?? new Date().toString() + Math.random().toString()} />
}

export default ExpensesList;