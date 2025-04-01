import { StyleSheet, Text, View } from "react-native"
import Input from "../UI/Input";
import { useState } from "react";
import { Expense } from "../../util/interfaces/Expense";
import Button from "../UI/Button";

const ExpenseForm = ({ onCancel, onSubmit, isEditing }: { onCancel: () => void, onSubmit?: () => void, isEditing: boolean }) => {

    const [inputValues, setInputValues] = useState<Expense>({
        amount: 0,
        date: new Date(),
        description: ''
    });

    const inputChangedHandler = (inputIdentifier: string, enteredValue: string) => {
        setInputValues((curInputValues: Expense) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }
        });
    };

    const submitHandler = () => {

    }

    return (
        <>
            <View style={styles.form}>

                <Text style={styles.title}>Sua despesa</Text>
                <View style={styles.containerValueDate}>
                    <Input style={styles.rowInput}
                        label="Valor"
                        keyboardType='decimal-pad'
                        onChangeText={inputChangedHandler.bind(this, 'amount')}
                        value={inputValues.amount}
                    />

                    <Input style={styles.rowInput}
                        label="Data"
                        placeholder='DD/MM/AAAA'
                        maxLength={10}
                        onChangeText={inputChangedHandler.bind(this, 'date')}
                        value={inputValues.date}
                    />
                </View>


                <Input
                    label="Descrição"
                    multiline={true}
                    autoCorrect={true}
                    onChangeText={inputChangedHandler.bind(this, 'description')}
                    value={inputValues.description} />

                <View style={styles.viewButton}>
                    <Button mode='flat' style={styles.buttonCancel} onPress={onCancel}>Cancelar</Button>
                    <Button onPress={submitHandler}>{isEditing ? 'Atualizar' : 'Adicionar'}</Button>
                </View>

            </View>
        </>
    );
}

export default ExpenseForm;


const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
        textAlign: 'center'
    },
    containerValueDate: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between'
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCancel: {
        marginRight: 28
    },
    rowInput: {
        flex: 1
    }
})