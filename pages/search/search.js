import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Constants from "expo-constants";
const camposRol =
{
    "Nombre": "Juan",
    "Apellido": "Perez",
    "Sucursal": "01",
    "Saldo": "27000"
}
export default function Search() {
    
    const [nombre, onChangeNombre] = React.useState(null);
    const [apellido, onChangeApellido] = React.useState(null);
    const [sucursal, onChangeSucursal] = React.useState(null);
    const [saldoMin, onChangeSaldoMin] = React.useState(null);
    const [saldoMax, onChangeSaldoMax] = React.useState(null);

    function imprimir(input) {
        return (
            <View>
                <Text>{input}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNombre}
                    value={input}
                    placeholder="Ingrese un "
                />
            </View>
        );
    }
    return (

        <View style={styles.container}>

            <Text styles={styles.text}>Buscar</Text>


            <View style={styles.contenedorBotones}>{
                Object.keys(camposRol).map((x, index) => (

                    <TouchableOpacity key={index} onPress={() => imprimir(x)}>
                        <View style={styles.button}>
                            <Text>{x}</Text>
                        </View>

                    </TouchableOpacity>

                ))
            }
            </View>

            <View style={styles.espacio}></View>

            <Text>Nombre</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNombre}
                value={nombre}
                placeholder="Ingrese un nombre"
            />
            <Text>Apellido</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeApellido}
                value={apellido}
                placeholder="Ingrese un apellido"
            />
            <Text>Sucursal</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeSucursal}
                value={sucursal}
                placeholder="Ingrese una Sucursal"
            />
            <Text>Saldo</Text>
            <View style={styles.inline}>
                <TextInput
                    style={styles.inputSaldo}
                    onChangeText={onChangeSaldoMin}
                    value={saldoMin}
                    placeholder="Ingrese una Sucursal"
                />
                <Text style={{ marginTop: 20 }}> ----- </Text>
                <TextInput
                    style={styles.inputSaldo}
                    onChangeText={onChangeSaldoMax}
                    value={saldoMax}
                    placeholder="Ingrese una Sucursal"
                />

            </View>

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
