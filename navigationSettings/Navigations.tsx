import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from '../constants/styles';
import { Ionicons } from '@expo/vector-icons';

import RecentExpenses from "../screens/RecentExpenses";
import AllExpenses from "../screens/AllExpenses";
import ManageExpense from '../screens/ManageExpense';



const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
    return <BottomTabs.Navigator screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500
    }}>
        <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={{
            title: 'Despesas recentes',
            tabBarLabel: 'Recentes',
            tabBarIcon: ({color, size}) => <Ionicons name='hourglass' size={size} color={color} />
        }} />
        <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={{
            title: 'Todas despesas',
            tabBarLabel: 'Todas',
            tabBarIcon: ({color, size}) => <Ionicons name='calendar' size={size} color={color} />
        }} />
    </BottomTabs.Navigator>
}

const Navigations = () => {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{ headerShown: false }} />
            <Stack.Screen name='ManageExpense' component={ManageExpense} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Navigations;