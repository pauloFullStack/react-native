import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface Input {
    label: string,
    keyboardType?: KeyboardTypeOptions,
    maxLength?: number,
    onChangeText?: (value1?: any, value2?: any) => void,
    placeholder?: string,
    multiline?: boolean,
    autoCorrect?: boolean,
    style?: StyleProp<TextStyle | ViewStyle>,
    value?: any
}

const Input = ({
    label,
    keyboardType = 'default',
    maxLength = 200,
    onChangeText = () => { },
    placeholder = '',
    multiline = false,
    autoCorrect = false,
    style = {},
    value = ''
}: Input) => {

    const inputStyles: {}[] = [styles.input];

    setStyle(inputStyles, multiline);

    return (
        <View style={[styles.inputContainer, style]}>
            
            <Text style={styles.label}>{label}</Text>
            
            <TextInput style={inputStyles}
                keyboardType={keyboardType}
                maxLength={maxLength}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={multiline}
                autoCorrect={autoCorrect}
                value={value} />

        </View>
    );

}

const setStyle = (inputStyles: {}[], multiline: boolean) => {
    if (multiline) inputStyles.push(styles.inputMultiline)
}

export default Input;


const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginBottom: 25,
        // marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    }
})