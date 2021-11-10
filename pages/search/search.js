import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Constants from "expo-constants";
import SelectDropdown from 'react-native-select-dropdown'
//import TextInput1 from "./components/TextInput.js"
import { color } from 'react-native-reanimated';
import clientesServices from '../../services/clientesServices';
const camposRol =
{
    "Otra": "01",
    "Nombre": "Juan",
    "AlgoMas": "Juan",
    "Apellido": "Perez",
    "Sucursal": "01",
    "Saldo": {
        min: 0,
        max: 27000
    }
}
const tipoCampos = {
    "Nombre": { type: "Text" },
    "Sucursal": { type: "Dropdown", options: [] },
    "Saldo": { type: "Saldo" }
}

export default function Search({ navigation }) {

    useEffect(() => {
        (async () => {
            const response = await clientesServices.getSucursales();
            tipoCampos.Sucursal.options = response.data
        })()
    }, [])

    const [campos, setCampos] = useState(Object.keys(camposRol).reduce((acumulador, actual) => {
        acumulador[actual] = false;
        return acumulador;
    }, {}));

    const [valores, setValores] = useState(camposRol);

    const activarInput = (nombre) => {
        let newCampos = { ...campos };
        newCampos[nombre] = true;
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
        <View style={styles.container}>
            <View style={styles.contenedorBotones}>{
                Object.keys(campos).map((x, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => activarInput(x)}>
                            <View style={styles.button}>
                                <Text >{x}</Text>
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
                            {(campos[x] && tipoCampos[x]?.type === "Dropdown" && (
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

                                (campos[x] && (tipoCampos[x]?.type == "Saldo") && (
                                    <>
                                        <TextInput
                                            returnKeyType={'done'}
                                            keyboardType={'numeric'}
                                            style={styles.inputSaldo}
                                            onChangeText={(text) => onChangeTextValores(text, "SaldoMin")}
                                            value={valores["Saldo"]["min"]}
                                            placeholder="Ingrese un minimo"
                                        />
                                        <Text style={{ marginTop: 20 }}> ----- </Text>
                                        <TextInput
                                            returnKeyType={'done'}
                                            keyboardType={'numeric'}
                                            style={styles.inputSaldo}
                                            onChangeText={(text) => onChangeTextValores(text, "SaldoMax")}
                                            value={valores["Saldo"]["max"]}
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
        padding: 2,
        display: 'flex',
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'green'
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
        display: 'flex'


    },

    text: {
        fontSize: 200,
    }



});
