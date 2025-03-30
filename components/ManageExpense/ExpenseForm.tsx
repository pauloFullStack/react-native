import { StyleSheet, Text, View } from "react-native"
import Input from "../UI/Input";

const ExpenseForm = () => {

    const amountChangeHandler = () => {

    }

    return (
        <>
            <View style={styles.form}>
                <Text style={styles.title}>Sua despesa</Text>
                <View style={styles.containerValueDate}>
                    <Input style={styles.rowInput}
                        label="Valor"
                        keyboardType='decimal-pad'
                        onChangeText={amountChangeHandler}
                    />

                    <Input style={styles.rowInput}
                        label="Data"
                        placeholder='DD/MM/AAAA'
                        maxLength={10}
                        onChangeText={() => { }}
                    />
                </View>


                <Input
                    label="Descrição"
                    multiline={true}
                    autoCorrect={true} />

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
    rowInput: {
        flex: 1
    }
})