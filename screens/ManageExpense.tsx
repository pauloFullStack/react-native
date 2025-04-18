import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ManageExpenseProps, ManageExpenseRouteProp, NavigationProps } from "../util/interfaces/Expense";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import { useContextExpense } from "../store/use-context";

import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpenseBd, storeExpense, updateExpenseBd } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense: React.FC<ManageExpenseProps> = ({ route }: { route: ManageExpenseRouteProp }) => {

    const [isSubmitting, setiIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>();

    const navigation = useNavigation<NavigationProps>();
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    const { deleteExpense, updateExpense, addExpense } = useContextExpense();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Editar despesa' : 'Adicionar despesa'
        })
    }, [navigation, isEditing])

    const confirmHandler = async (expenseData: any) => {

        setiIsSubmitting(true);

        try {

            if (isEditing) {
                updateExpense(expenseId, expenseData);
                await updateExpenseBd(expenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);

                if (id !== '') {
                    addExpense({ ...expenseData, id });
                }
            }

            navigation.goBack();
        } catch (error) {
            setError('Não foi possível salvar os dados - tente novamente mais tarde!');
            setiIsSubmitting(false);
        }

    }

    const deleteExpenseHandler = async () => {

        setiIsSubmitting(true);

        try {

            await deleteExpenseBd(expenseId ?? '');
            deleteExpense(expenseId ?? '');
            navigation.goBack();

        } catch (error) {

            setError('Não foi possível excluir a despesa - tente novamente mais tarde');
            setiIsSubmitting(false);
        }

    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={() => { setError(null) }} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                isEditing={isEditing}
                dataExpense={JSON.stringify({
                    amount: route.params?.amount,
                    date: route.params.date ? route.params.date : `${new Date().toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}T00:00:00`,
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