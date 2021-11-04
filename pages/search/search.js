import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Constants from "expo-constants";
import TextInput1 from "./components/TextInput.js"
import { color } from 'react-native-reanimated';
const camposRol =
{
    "Nombre": "Juan",
    "Apellido": "Perez",
    "Sucursal": "01",
    "Saldo": "27000"
}

export default function Search({ navigation }) {

    const [nombre, onChangeNombre] = React.useState(null);
    const [apellido, onChangeApellido] = React.useState(null);
    const [sucursal, onChangeSucursal] = React.useState(null);
    const [saldoMin, onChangeSaldoMin] = React.useState(null);
    const [saldoMax, onChangeSaldoMax] = React.useState(null);

    return (
        <View style={styles.container}>
            <Text styles={styles.text}>Buscar</Text>
            <View style={styles.contenedorBotones}>{
                Object.keys(camposRol).map((x, index) => (
                    <View>
                        <TouchableOpacity key={index} onPress={() => TextInput1(x)}>
                            <View style={styles.button}>
                                <Text>{x}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
            }
            </View>
            <View style={styles.espacio}></View>
            <Text>Provisorio </Text>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Results')
                }>
                    <View >
                        <Text style={{ color: 'red' }} >ir a results</Text>
                    </View>
                </TouchableOpacity>
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        display: 'flex',
        color: 'black',

    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    inputSaldo: {
        height: 40,
        width: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,

    },
    inline: {
        flexDirection: 'row',
    },
    espacio: {
        margin: 20,
    },
    container: {
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
    },
    contenedorBotones: {
        marginTop: 35,
        alignItems: 'center',

    },

    text: {
        fontSize: 200,
    }



});
