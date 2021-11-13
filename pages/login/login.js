import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Constants from "expo-constants";
import GlobalContext, { authData } from '../../components/globals/context.js';
import clientesServices from '../../services/clientesServices.js'
import biometricsAuth from '../LocalAuth/localAuth.js'

export default function Login({ navigation }) {

    const [usuario, onChangeUsuario] = React.useState(null);
    const [contrasenia, onChangeContrasenia] = React.useState(null);
    const { setAuthData } = useContext(GlobalContext)
    const [login, setLogin] = useState(authData)


    const postLogin = async () => {
        try {
            const response = await clientesServices.login(login.dni, login.pass);

            setAuthData({
                ...authData,
                dni: login.dni,
                rol: response.data[0].rol,
                campos: response.data[1]
            })

        } catch (error) {
            console.error(error);
            Alert.alert(error.response.data);
        }
    }

    return (

        <View style={styles.container}>

            <Text>Usuario</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => { setLogin({ ...login, dni: text }) }}
                value={login.dni}
                placeholder="Ingrese usuario"
            />
            <Text>Contraseña</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(text) => { setLogin({ ...login, pass: text }) }}
                value={login.pass}
                placeholder="Ingrese contraseña"
            />
            <Button
                title="Iniciar sesion"
                onPress={postLogin}
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
