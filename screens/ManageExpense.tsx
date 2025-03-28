import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ManageExpenseProps, ManageExpenseRouteProp, NavigationProps } from "../util/interfaces/Expense";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";

const ManageExpense: React.FC<ManageExpenseProps> = ({ route }: { route: ManageExpenseRouteProp }) => {

    const navigation = useNavigation<NavigationProps>();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: !!route.params?.expenseId ? 'Editar despesa' : 'Adicionar despesa'
        })
    }, [navigation, route.params?.expenseId])

    const deleteExpenseHandler = () => { }

    const cancelHandler = () => { 
        navigation.goBack();
    }

    const confirmHandler = () => { }

    return (
        <View style={styles.container}>
            <View style={styles.viewButton}>
                <Button mode='flat' style={styles.buttonCancel} onPress={cancelHandler}>Cancelar</Button>
                <Button onPress={confirmHandler}>{!!route.params?.expenseId ? 'Atualizar' : 'Adicionar'}</Button>
            </View>
            {!!route.params?.expenseId && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler} />
                </View>
            )}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCancel:{
        marginRight: 28
    }
})