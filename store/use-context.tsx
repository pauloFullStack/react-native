import { useContext } from "react";
import { ExpensesContextType } from "../util/interfaces/Expense";
import { ExpensesContext } from "./expenses-context";

export const useContextExpense = (): ExpensesContextType => {

    const context = useContext(ExpensesContext);

    if (!context) throw new Error('useExpenses deve ser usado dentro do ExpensesContextProvider');

    return context;

}