import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from '../constants/styles';
import { Ionicons } from '@expo/vector-icons';
import { ManageExpenseProps, RootStackParamList } from '../util/interfaces/Expense';

import RecentExpenses from "../screens/RecentExpenses";
import AllExpenses from "../screens/AllExpenses";
import ManageExpense from '../screens/ManageExpense';
import IconButton from '../components/UI/IconButton';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
    return <BottomTabs.Navigator screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => <IconButton
            icon='add'
            size={24}
            color={tintColor}
            onPress={() => {
                navigation.navigate('ManageExpense', {id: '', description: '', amount: 0})
            }} />
    })}>
        <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={{
            title: 'Despesas recentes',
            tabBarLabel: 'Recentes',
            tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color} />
        }} />
        <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={{
            title: 'Todas despesas',
            tabBarLabel: 'Todas',
            tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />
        }} />
    </BottomTabs.Navigator>
}

const Navigations = () => {
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
        }}>
            <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{ headerShown: false }} />
            <Stack.Screen name='ManageExpense' options={{
                presentation: 'modal'
            }} >
                {(props: ManageExpenseProps) => <ManageExpense {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
}

export default Navigations;