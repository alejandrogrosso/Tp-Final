import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableHighlight } from 'react-native';

export default function Search() {
    const [nombre, onChangeNombre] = React.useState(null);
    const [apellido, onChangeApellido] = React.useState(null);
    const [sucursal, onChangeSucursal] = React.useState(null);
    const [saldoMin, onChangeSaldoMin] = React.useState(null);
    const [saldoMax, onChangeSaldoMax] = React.useState(null);
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.Button}>
                <Button

                    title="Iniciar sesion"
                    onPress={() => Alert.alert('Funciono el boton!')}
                />
            </TouchableHighlight>
            <Button
                style={styles.Button}
                title="Iniciar sesion"
                onPress={() => Alert.alert('Funciono el boton!')}
            />

            <Text>Nombre</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNombre}
                value={nombre}
                placeholder="Ingrese usuario"
            />
            <Text>Apellido</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeApellido}
                value={apellido}
                placeholder="Ingrese contraseña"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Button: {
        backgroundColor: `#ff5c5c`,
        color: `#2196F3`,
        borderColor: "#ff5c5c",

    },
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }

});
