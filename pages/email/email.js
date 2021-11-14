import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Constants from "expo-constants";
import GlobalContext from '../../components/globals/context.js';
import clientesServices from '../../services/clientesServices.js'


export default function email() {
    const { resultsGlobal } = useContext(GlobalContext)
    const [correoCompleto, setCorreoCompleto] = useState({ "para": "", "asunto": "", "cuerpoMensaje": "", "resultados": resultsGlobal })


    return (

        <View style={styles.container}>

            <Text>Para: </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => { setCorreoCompleto({ ...correoCompleto, para: text }) }}
                value={correoCompleto.para}
                placeholder="Ingrese destinatario"
            />
            <Text>Asunto</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => { setCorreoCompleto({ ...correoCompleto, asunto: text }) }}
                value={correoCompleto.asunto}
                placeholder="Ingrese asunto"
            />
            <Text>Cuerpo</Text>
            <TextInput
                style={styles.inputBody}
                onChangeText={(text) => { setCorreoCompleto({ ...correoCompleto, cuerpoMensaje: text }) }}
                value={correoCompleto.cuerpoMensaje}
                multiline={true}

            />
            <Button
                title="Enviar"
                onPress={async () => {
                    try {
                        await clientesServices.correo(correoCompleto)
                    } catch (error) {
                        console.error(error);
                        Alert.alert(error.response.data);
                    }
                }}
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
    inputBody: {
        height: 300,
        width: 400,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top'
    },


});