import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Constants from "expo-constants";
import SelectDropdown from 'react-native-select-dropdown'
import clientesServices from '../../services/clientesServices';
import GlobalContext from '../../components/globals/context.js';
import _ from 'lodash'


const tipoCampos = {
    "nombre": { type: "text" },
    "sucursal": { type: "dropdown", options: [] },
    "saldoMin": { type: "number" },
    "saldoMax": { type: "number" }
}

export default function Search({ navigation }) {

    useEffect(() => {
        (async () => {
            const response = await clientesServices.getSucursales();
            tipoCampos.sucursal.options = response.data
        })()
        return () => {
            setResultsGlobal([])
        }
    }, [])
    const { AuthData, setAuthData, resultsGlobal, setResultsGlobal } = useContext(GlobalContext)


    const [campos, setCampos] = useState(AuthData.campos.reduce((acumulador, actual) => {
        acumulador[actual] = false;
        return acumulador;
    }, {}));


    const [valores, setValores] = useState(AuthData.campos.reduce((acumulador, actual) => {
        acumulador[actual] = '';
        return acumulador;
    }, {}));



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
        newValores[campo] = text;
        setValores(newValores);
    };

    const onClickBuscar = async () => {
        const valoresAbuscar = valores
        _.forEach(valoresAbuscar, (value, key) => {
            if (key == 'saldoMin' || key == 'saldoMax' || key == 'sucursal') {
                const num = parseInt(value)
                if (isNaN(num)) {
                    valoresAbuscar[key] = ""
                } else {
                    valoresAbuscar[key] = num
                }

            } else {
                valoresAbuscar[key] = value
            }
        });
        console.log('valoresAbuscar', valoresAbuscar)
        const resultados = await clientesServices.search(valoresAbuscar);
        setResultsGlobal(resultados.data)
        navigation.navigate('Results')
    }

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
                                                onChangeTextValores(selectedItem, x);
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

                                    (campos[x] && (tipoCampos[x]?.type == "number") && (
                                        <>
                                            <Text>{x}</Text>
                                            <TextInput
                                                type={'number'}
                                                returnKeyType={'done'}
                                                keyboardType={'numeric'}
                                                style={styles.inputSaldo}
                                                onChangeText={(text) => onChangeTextValores(text, x)}
                                                value={valores[x]}
                                                placeholder="Ingrese un minimo"
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
                    <TouchableOpacity onPress={() => onClickBuscar()}
                    >
                        <View style={styles.buttonSend}>
                            <Text style={styles.buttonTextSend} >Buscar</Text>
                        </View>
                    </TouchableOpacity>
                </View >
            </View >
        </ScrollView >
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
