import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface Expense {
    id?: string,
    amount: number,
    description: string
    date: Date
}


export type RootStackParamList = {
    ManageExpense: { expenseId?: string, description: string, amount: number, date?: string }; // Definindo que 'ManageExpense' precisa de um 'expenseId'
    ExpensesOverview: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList, "ManageExpense">;

export type ManageExpenseRouteProp = RouteProp<RootStackParamList, "ManageExpense">;

export interface ManageExpenseProps {
    route: ManageExpenseRouteProp;
}


// Tipo para o estado
export type ExpensesState = Expense[];

// Tipo para ações do reducer
export type ExpenseAction =
    | { type: "ADD"; payload: Expense }
    | { type: "UPDATE"; payload: { id: string; data: Expense } }
    | { type: "SET"; payload: any }
    | { type: "DELETE"; payload: string };

// Tipo para o contexto
export interface ExpensesContextType {
    expenses: ExpensesState;
    addExpense: (expenseData: Expense) => void;
    setExpenses: (expenses: any) => void,
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, expenseData: Expense) => void;
}

export interface DefaultFormFieldsProperties {
    value: string;
    isValid: boolean
}

export interface FormFields {
    amount: DefaultFormFieldsProperties,
    date: DefaultFormFieldsProperties,
    description: DefaultFormFieldsProperties
}