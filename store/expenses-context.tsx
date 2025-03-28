import { createContext, useReducer } from "react";
import { Expense } from "../util/interfaces/Expense";

// Definição do estado inicial (lista vazia)
const initialExpensesState: Expense[] = [];

// Tipo para o estado
type ExpensesState = Expense[];

// Tipo para ações do reducer
type ExpenseAction =
    | { type: "ADD"; payload: Expense }
    | { type: "UPDATE"; payload: { id: string; data: Expense } }
    | { type: "DELETE"; payload: string };

// Tipo para o contexto
interface ExpensesContextType {
    expenses: ExpensesState;
    addExpense: (expenseData: Expense) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, expenseData: Expense) => void;
}

export const ExpensesContext = createContext<ExpensesContextType | undefined>({
    expenses: [],
    addExpense: ({ description, amount, date }: Expense) => { },
    deleteExpense: (id: string) => { },
    updateExpense: (id: string, { description, amount, date }: Expense) => { }
});

// seguir o video e arrumar as tipagens
const expensesReducer = (state: any, action: any) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "UPDATE":
            return state.map((expense: any) =>
                expense.id === action.payload.id ? { ...expense, ...action.payload.data } : expense
            );
        case "DELETE":
            return state.filter((expense: any) => expense.id !== action.payload);
        default:
            return state;
    }
}

const ExpensesContextProvider = ({ children }: { children: any }) => {

    const [expensesState, dispatch] = useReducer<React.Reducer<Expense[], ExpenseAction>>(
        expensesReducer,
        initialExpensesState
    );

    const addExpense = (expenseData: Expense) => {
        dispatch({ type: "ADD", payload: expenseData });
    };

    const deleteExpense = (id: string) => {
        dispatch({ type: "DELETE", payload: id });
    };

    const updateExpense = (id: string, expenseData: Expense) => {
        dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
    };

    return <ExpensesContext.Provider value={{ expenses: expensesState, addExpense, deleteExpense, updateExpense }}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;