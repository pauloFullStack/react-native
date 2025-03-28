import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface Expense {
    id?: string,
    amount: number,
    description: string
    date: Date
}


export type RootStackParamList = {
    ManageExpense: { expenseId?: string }; // Definindo que 'ManageExpense' precisa de um 'expenseId'
    ExpensesOverview: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList, "ManageExpense">;

export type ManageExpenseRouteProp = RouteProp<RootStackParamList, "ManageExpense">;

export interface ManageExpenseProps {
    route: ManageExpenseRouteProp;
}