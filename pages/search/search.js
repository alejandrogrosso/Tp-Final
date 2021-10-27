import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableHighlight } from 'react-native';

const camposRol =

{
    "Nombre": "Juan",
    "Apellido": "Perez",
    "Sucursal": "01",
    "Saldo": "27000"
}

var buttonsListArr = [];

function RenderButton(campos) {
    for (let x in campos) {
        buttonsListArr.push(
            <View style={styles.Button}>
                <Button
                    title={x}
                    onPress={() => Alert.alert('Funciono el boton!')}
                />
            </View>
        )
        
    }
    
}


export default function Search() {
    const [nombre, onChangeNombre] = React.useState(null);
    const [apellido, onChangeApellido] = React.useState(null);
    const [sucursal, onChangeSucursal] = React.useState(null);
    const [saldoMin, onChangeSaldoMin] = React.useState(null);
    const [saldoMax, onChangeSaldoMax] = React.useState(null);
    
    return (
        <View style={styles.container}>

            <View style={{ margin: 50 }}></View>
            <Text>Buscar</Text>
            <View style={{ margin: 20 }}></View>

            <><View>
                for (let x in camposRol) {
                    <View style={styles.Button}>
                        <Button
                            title={x}
                            onPress={() => Alert.alert('Funciono el boton!')}
                        />
                    </View>
                }
            </View></>

            {buttonsListArr}
            
            <View style={styles.inline}>
                <View style={styles.Button}>
                    <Button
                        title="Nombre"
                        onPress={() => Alert.alert('Funciono el boton!')}
                    />
                </View>
                <View style={styles.Button}>
                    <Button
                        title="Apellido"
                        onPress={() => Alert.alert('Funciono el boton!')}
                    />
                </View>

            </View>
            <View style={styles.inline}>
                <View style={styles.Button}>
                    <Button
                        title="Sucursal"
                        onPress={() => Alert.alert('Funciono el boton!')}
                    />
                </View>
                <View style={styles.Button}>
                    <Button
                        title="Saldo"
                        onPress={() => Alert.alert('Funciono el boton!')}
                    />
                </View>

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
                value={apellido}
                placeholder="Ingrese una Sucursal"
            />
            <Text>Saldo</Text>
            <View style={styles.inline}>
                <TextInput
                    style={styles.inputSaldo}
                    onChangeText={onChangeSucursal}
                    value={apellido}
                    placeholder="Ingrese una Sucursal"
                />
                <Text style={{ marginTop: 20 }}> ----- </Text>
                <TextInput
                    style={styles.inputSaldo}
                    onChangeText={onChangeSucursal}
                    value={apellido}
                    placeholder="Ingrese una Sucursal"
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    Button: {
        margin: 10,
        display: 'flex',
        color: 'black',

    },
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
        padding: 10
    },
    inputSaldo: {
        height: 40,
        width: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    inline: {

        flexDirection: 'row',
    },
    espacio: {
        margin: 20,
    }


});
