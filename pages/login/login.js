
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Constants from "expo-constants";

export default function Login({ navigation }) {
    const [usuario, onChangeUsuario] = React.useState(null);
    const [contrasenia, onChangeContrasenia] = React.useState(null);
    return (

        <View style={styles.container}>
            
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
                onPress={() => navigation.navigate('Search')
                }
            />

        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
   

});
