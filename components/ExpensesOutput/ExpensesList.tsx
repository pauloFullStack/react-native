import { FlatList, Text } from "react-native";
import { Expense } from "./interfarces/Expense";

const renderExpenseItem = (itemData: { item: Expense }) => {
    return <Text>{itemData.item.description}</Text>
}

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
    return <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id} />
}

export default ExpensesList;