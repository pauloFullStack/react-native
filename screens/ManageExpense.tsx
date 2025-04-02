import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ManageExpenseProps, ManageExpenseRouteProp, NavigationProps } from "../util/interfaces/Expense";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import { useContextExpense } from "../store/use-context";

import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense: React.FC<ManageExpenseProps> = ({ route }: { route: ManageExpenseRouteProp }) => {

    const navigation = useNavigation<NavigationProps>();
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    const { deleteExpense, updateExpense, addExpense } = useContextExpense();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Editar despesa' : 'Adicionar despesa'
        })
    }, [navigation, isEditing])

    const confirmHandler = (expenseData: any) => {

        if (isEditing) {
            updateExpense(expenseId, expenseData);
        } else {
            addExpense(expenseData);
        }
        navigation.goBack();
    }

    const deleteExpenseHandler = () => {
        deleteExpense(expenseId ?? '');
        navigation.goBack();
    }

    const cancelHandler = () => {
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                isEditing={isEditing}
                dataExpense={JSON.stringify({
                    amount: route.params?.amount,
                    date: route.params.date?.toString(),
                    description: route.params.description
                })}
                 />

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


})