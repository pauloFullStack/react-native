import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecentExpenses from "../screens/RecentExpenses";
import AllExpenses from "../screens/AllExpenses";
import ManageExpense from '../screens/ManageExpense';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
    return <BottomTabs.Navigator>
        <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} />
        <BottomTabs.Screen name='AllExpenses' component={AllExpenses} />
    </BottomTabs.Navigator>
}

const Navigations = () => {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} />
            <Stack.Screen name='ManageExpense' component={ManageExpense} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Navigations;