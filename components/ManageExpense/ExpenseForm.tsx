import { StyleSheet, Text, View, Alert } from "react-native"
import Input from "../UI/Input";
import { useState } from "react";
import Button from "../UI/Button";
import { FormFields } from "../../util/interfaces/Expense";

const ExpenseForm = ({ onCancel, onSubmit, isEditing, dataExpense }: { onCancel: () => void, onSubmit: (value: any) => void, isEditing: boolean, dataExpense?: string }) => {

    const [inputs, setInputs] = useState<FormFields>(() => {

        const parsed = JSON.parse(dataExpense ?? '{}');

        const amountValue = parsed.amount?.toString() ?? '';
        const dateValue = parsed.date ?? new Date().toISOString().split('T')[0];
        const descriptionValue = parsed.description ?? '';

        return {
            amount: {
                value: amountValue,
                isValid: true
            },
            date: {
                value: dateValue,
                isValid: true
            },
            description: {
                value: descriptionValue,
                isValid: true
            }
        };
    });


    const inputChangedHandler = (inputIdentifier: string, enteredValue: string) => {

        let sanitizedValue = enteredValue;

        if (inputIdentifier === 'amount') {
            // Remove tudo que não for número ou ponto (1 ponto só)
            sanitizedValue = sanitizedValue
                .replace(',', '.') // vírgula por ponto
                .replace(/[^0-9.]/g, '') // só números e ponto
                .replace(/(\..*?)\..*/g, '$1'); // só um ponto decimal
        }

        setInputs((curInputs: FormFields) => {

            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        });
    };

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: inputs.date.value,
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date ? expenseData.date.toString() !== 'Invalid Date' ? true : false : false;
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {

            setInputs((curInputs: FormFields) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            });

            return;
        }

        onSubmit(expenseData);
    }

    return (
        <>
            <View style={styles.form}>

                <Text style={styles.title}>Sua despesa</Text>
                <View style={styles.containerValueDate}>

                    <Input style={styles.rowInput}
                        label="Valor"
                        // keyboardType='decimal-pad'
                        onChangeText={inputChangedHandler.bind(this, 'amount')}
                        value={inputs.amount.value ?? ''}
                        isShowMessageError={!inputs.amount.isValid}
                        messageError="O campo valor é invalido"
                    />

                    <Input style={styles.rowInput}
                        label="Data"
                        placeholder='DD/MM/AAAA'
                        maxLength={10}
                        onChangeText={inputChangedHandler.bind(this, 'date')}
                        value={inputs.date.value}
                        isShowMessageError={!inputs.date.isValid}
                        messageError="O campo data é invalido"
                    />

                </View>

                <Input
                    label="Descrição"
                    multiline={true}
                    autoCorrect={true}
                    onChangeText={inputChangedHandler.bind(this, 'description')}
                    value={inputs.description.value}
                    isShowMessageError={!inputs.description.isValid}
                    messageError="O campo descrição é invalido" />

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