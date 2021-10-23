
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function Login() {
    const [usuario, onChangeUsuario] = React.useState(null);
    const [contrasenia, onChangeContrasenia] = React.useState(null);
    return (

        <View style={styles.container}>

        <View style={styles.espacio}></View>
        <Text>Login</Text>
        <View style={styles.espacio}></View>

            <Text>Usuario</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsuario}
                value={usuario}
                placeholder="Ingrese usuario"
            />
            <Text>Contraseña</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeContrasenia}
                value={contrasenia}
                placeholder="Ingrese contraseña"
            />
            <Button
                title="Iniciar sesion"
                onPress={() => Alert.alert('Funciono el boton!')}
            />

        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    espacio:{ margin:50},

});
