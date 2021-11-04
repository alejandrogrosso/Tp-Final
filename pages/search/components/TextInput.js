import React from 'react';
import { TextInput, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
export default function TextInput1(valor) {
    console.log(valor)
    // const [valor, setValor] = React.useState(null);

    return (
        <View style={styles.container}>
            <Text>{valor}</Text>
            <TextInput
                style={styles.input}

                value={valor}
                placeholder={valor}
            />
        </View>

    );

}
const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    container: {
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
    },
})