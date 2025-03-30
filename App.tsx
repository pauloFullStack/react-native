import { StatusBar } from 'expo-status-bar';
import Navigations from './navigationSettings/Navigations';
import ExpensesContextProvider from './store/expenses-context';


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <Navigations />
      </ExpensesContextProvider>
    </>
  );
}
