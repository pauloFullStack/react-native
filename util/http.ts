import axios from "axios"
import { Expense } from "./interfaces/Expense";

const API_URL = 'https://react-native-curse-4e313-default-rtdb.firebaseio.com/';

export const storeExpense = async (expenseData: any) => {

    const response = await axios.post(`${API_URL}expense.json`, expenseData);

    if (response && response.data)
        return response.data.name;
    else
        return '';

}

export const getExpenses = async () => {

    const response = await axios.get(`${API_URL}expense.json`);

    const expenses: Expense[] = [];

    if (response && response.data) {

        for (const key in response.data) {

            expenses.push({
                id: key,
                amount: response.data[key].amount,
                date: response.data[key].date,
                description: response.data[key].description
            });

        }
    }

    return expenses;
};

export const updateExpenseBd = (id: string, expenseData: any) => {
    return axios.put(`${API_URL}expense/${id}.json`, expenseData);
}

export const deleteExpenseBd = (id: string) => {
    return axios.delete(`${API_URL}expense/${id}.json`)
}