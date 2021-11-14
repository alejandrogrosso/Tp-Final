import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Constants from "expo-constants";
import GlobalContext, { authData } from '../../components/globals/context.js';
import clientesServices from '../../services/clientesServices.js'
import { getBiometricData, saveBiometricData, resetBiometricData } from '../../components/biometricAsynStorage/biometricAsyncStorage.js';
import { checkDeviceBiometricCompatible, biometricsAuth } from '../LocalAuth/localAuth.js'; '../LocalAuth/localAuth.js';

export default function Login({ navigation }) {

    const [usuario, onChangeUsuario] = React.useState(null);
    const [contrasenia, onChangeContrasenia] = React.useState(null);
    const { setAuthData } = useContext(GlobalContext);
    const [login, setLogin] = useState(authData);

    const postLogin = async (ud = null) => {
        try {
            let dni = ud ? ud.dni : login.dni;
            let pass = ud ? ud.pass : login.pass;

            const response = await clientesServices.login(dni, pass);

            const continueLogin = () => {
                setAuthData({
                    ...authData,
                    dni: dni,
                    rol: response.data[0].rol,
                    campos: response.data[1]
                });
            };

            if (await checkDeviceBiometricCompatible()) {
                let userData = await getBiometricData();
                if (!userData) {
                    const localAuthPrompt = () => {
                        Alert.alert(
                            'Datos Biometricos', 'Desea utilizar datos biometricos para autenticarse?',
                            [
                                {
                                    text: 'Si', onPress: async () => {
                                        if (await biometricsAuth()) {
                                            saveBiometricData({ dni: login.dni, pass: login.pass });
                                            continueLogin();
                                        }
                                    }
                                },
                                {
                                    text: 'No',
                                    onPress: () => continueLogin(),
                                    style: 'cancel',
                                },
                            ]
                        )
                    };

                    localAuthPrompt();
                } else {
                    continueLogin();
                }
            } else {
                continueLogin();
            }
        } catch (error) {
            console.error(error);
            Alert.alert(error.response.data);
        }
    }

    const checkBiometricData = async () => {
        const userData = await getBiometricData();
        if (await checkDeviceBiometricCompatible() && userData) {
            if (await biometricsAuth()) {
                postLogin(userData);
            }
        }
    }

    useEffect(() => {
        checkBiometricData();
    }, []);

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
                onPress={() => postLogin()}
            />

            {/* <Button
                title="borrar datos biometricos"
                onPress={() => resetBiometricData()}
            /> */}

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
