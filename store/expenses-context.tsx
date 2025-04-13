import { createContext, useReducer } from "react";
import { Expense, ExpensesState, ExpenseAction, ExpensesContextType } from "../util/interfaces/Expense";


// Definição do estado inicial (lista vazia)



export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    addExpense: ({ description, amount, date }: Expense) => { },
    setExpenses: (expenses: any) => { },
    deleteExpense: (id: string) => { },
    updateExpense: (id: string, { description, amount, date }: Expense) => { }
});

const expensesReducer = (state: Expense[], action: any) => {

    switch (action.type) {

        case "ADD":
            return [action.payload, ...state];

        case 'SET':

            return action.payload ? action.payload.reverse() : [];

        case "UPDATE":

            const t = state.map((expense: any) =>
                expense.id === action.payload.id ? { ...expense, ...action.payload.data } : expense
            )

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
        []
    );

    const addExpense = (expenseData: Expense) => {
        dispatch({ type: "ADD", payload: expenseData });
    };

    const setExpenses = (expenses: any) => {
        dispatch({ type: 'SET', payload: expenses })
    }

    const deleteExpense = (id: string) => {
        dispatch({ type: "DELETE", payload: id });
    };

    const updateExpense = (id: string, expenseData: Expense) => {
        dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
    };

    return <ExpensesContext.Provider value={{
        expenses: expensesState,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpense
    }}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;