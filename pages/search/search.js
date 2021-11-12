import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import Constants from "expo-constants";
import SelectDropdown from 'react-native-select-dropdown'
//import TextInput1 from "./components/TextInput.js"
import { color } from 'react-native-reanimated';
import clientesServices from '../../services/clientesServices';
import GlobalContext, { authData } from '../../components/globals/context.js';


/*{
    "nombre": "",
    "apellido": "",
    "sucursal": "",
    "saldo": {
        min: 0,
        max: 0
    }
}*/
const tipoCampos = {
    "nombre": { type: "text" },
    "sucursal": { type: "dropdown", options: [] },
    "saldo": { type: "saldo" }
}

export default function Search({ navigation }) {

    useEffect(() => {
        (async () => {
            const response = await clientesServices.getSucursales();
            tipoCampos.sucursal.options = response.data
        })()
    }, [])
    const { AuthData, setAuthData } = useContext(GlobalContext)
    const [camposRol, setCamposRol] = useState(AuthData.campos)
    console.log(AuthData.campos)
    const [campos, setCampos] = useState(camposRol.reduce((acumulador, actual) => {
        acumulador[actual] = false;
        return acumulador;
    }, {}));

    const [valores, setValores] = useState(camposRol);

    const activarInput = (nombre) => {
        let newCampos = { ...campos };
        if (newCampos[nombre]) {
            newCampos[nombre] = false;
        } else {
            newCampos[nombre] = true;
        }
        setCampos(newCampos);
    };

    const onChangeTextValores = (text, campo) => {
        let newValores = { ...valores };
        if (campo.startsWith('Saldo')) {
            if (campo === "SaldoMin") {
                newValores.Saldo = {
                    min: text,
                    max: newValores.Saldo.max
                }
            } else if (campo === 'SaldoMax') {
                newValores.Saldo = {
                    min: newValores.Saldo.min,
                    max: text
                }
            }
        } else {
            newValores[campo] = text;
        }
        setValores(newValores);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.contenedorBotones}>{
                    Object.keys(campos).map((x, index) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => activarInput(x)} >
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>{x}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                }
                </View >

                <View style={styles.container}>
                    {
                        Object.keys(campos).map((x, index) => (
                            <View key={`view-${index}`}>
                                {(campos[x] && tipoCampos[x]?.type === "dropdown" && (
                                    <>
                                        <SelectDropdown
                                            defaultButtonText={x}
                                            data={tipoCampos[x].options}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem, index)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />
                                    </>))

                                    ||

                                    (campos[x] && (tipoCampos[x]?.type == "saldo") && (
                                        <>
                                            <TextInput
                                                returnKeyType={'done'}
                                                keyboardType={'numeric'}
                                                style={styles.inputSaldo}
                                                onChangeText={(text) => onChangeTextValores(text, "saldoMin")}
                                                value={valores["saldo"]["min"]}
                                                placeholder="Ingrese un minimo"
                                            />
                                            <Text style={{ marginTop: 20 }}> ----- </Text>
                                            <TextInput
                                                returnKeyType={'done'}
                                                keyboardType={'numeric'}
                                                style={styles.inputSaldo}
                                                onChangeText={(text) => onChangeTextValores(text, "saldoMax")}
                                                value={valores["saldo"]["max"]}
                                                placeholder="Ingrese un maximo"
                                            />

                                        </>
                                    ))

                                    ||

                                    (campos[x] && (
                                        <>
                                            <Text>{x}</Text>
                                            <TextInput onChangeText={(text) => onChangeTextValores(text, x)}
                                                style={styles.input}
                                                value={valores[x]}
                                                placeholder={x}
                                            />
                                        </>))}
                            </View>
                        ))
                    }
                </View>

                <View style={styles.espacio}></View>


                <Text>Provisorio </Text>
                <View>
                    <TouchableOpacity onPress={() => clientesServices.search(valores)
                    }>
                        <View style={styles.buttonSend}>
                            <Text style={styles.buttonTextSend} >Buscar</Text>
                        </View>
                    </TouchableOpacity>
                </View >
            </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 75,
        height: 30,
        margin: 10,
        padding: 2,
        display: 'flex',
        borderRadius: 5,
        backgroundColor: '#207EDC'
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        marginTop: 4,
        textTransform: 'capitalize'
    },
    buttonSend: {
        width: 100,
        height: 40,
        margin: 10,
        padding: 2,
        display: 'flex',
        borderRadius: 5,
        backgroundColor: '#7F858A'
    },
    buttonTextSend: {
        textAlign: 'center',
        color: '#fff',
        marginTop: 5,
        textTransform: 'capitalize',
        fontSize: 17
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
        width: 200,
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
        flexDirection: 'row',
        marginTop: 35,
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap'
    },

    text: {
        fontSize: 200,
    },





});
