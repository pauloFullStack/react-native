import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { GetFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationProps } from "../../util/interfaces/Expense";

// type RootStackParamList = {
//     // caso não passe parametros, setar o tipo como undefined
//     // ManageExpense: undefined;
//     ManageExpense: { expenseId: string };
// };

// type NavigationProps = NativeStackNavigationProp<RootStackParamList, "ManageExpense">;

const ExpenseItem = ({ id, description, amount, date }: { id?: string, description?: string, amount?: number, date?: Date }) => {

    const navigation = useNavigation<NavigationProps>();

    const ExpensePressHandler = () => {
    
        navigation.navigate('ManageExpense', { 
            expenseId: id, 
            description: description ?? '', 
            amount: amount ?? 0, 
            date: date ? GetFormattedDate(date) : `${new Date().toLocaleString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'})}T00:00:00`});
    }

    return (
        <Pressable onPress={ExpensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{GetFormattedDate(date ?? new Date())}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{ amount ? amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExpenseItem;


const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    }
})