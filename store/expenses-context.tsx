import { createContext, useReducer } from "react";
import { Expense, ExpensesState, ExpenseAction, ExpensesContextType } from "../util/interfaces/Expense";


// Definição do estado inicial (lista vazia)
const initialExpensesState: Expense[] = [
    {
        id: 'e1',
        description: 'Um par de sapatos',
        amount: 59.99,
        date: new Date('2025-03-28')
    },
    {
        id: 'e2',
        description: 'Um par de calças',
        amount: 89.29,
        date: new Date('2025-03-27')
    },
    {
        id: 'e3',
        description: 'Algumas bananas',
        amount: 5.99,
        date: new Date('2025-03-25')
    },
    {
        id: 'e4',
        description: 'Um livro',
        amount: 14.99,
        date: new Date('2025-03-24')
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
];


export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    addExpense: ({ description, amount, date }: Expense) => { },
    deleteExpense: (id: string) => { },
    updateExpense: (id: string, { description, amount, date }: Expense) => { }
});

const expensesReducer = (state: Expense[], action: any) => {

    switch (action.type) {
        case "ADD":

            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id }, ...state];
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

    return <ExpensesContext.Provider value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense
    }}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;