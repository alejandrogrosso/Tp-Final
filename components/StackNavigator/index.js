import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Login from '../../pages/login/login.js'
import Search from '../../pages/search/search.js'
import Results from '../../pages/results/results.js'
import GlobalContext from '../../components/globals/context.js';
import email from '../../pages/email/email.js';
import pdf from '../../pages/pdf/pdf.js';


export default function StackNavigator() {
    const { setAuthData, setResultsGlobal } = useContext(GlobalContext)
    const Stack = createStackNavigator()

    return (

        <Stack.Navigator initialRouteName={'Search'}>
            <Stack.Screen name={'Search'} component={Search} options={{ title: 'Busqueda' }, {
                headerRight: () => (<TouchableOpacity
                    onPress={() => {
                        setAuthData({
                            rol: "",
                            dni: "",
                            campos: []
                        })
                        setResultsGlobal([])
                    }}>
                    <View style={styles.btn}><Text style={styles.btnText}>Logout</Text></View>
                </TouchableOpacity >)
            }} />
            <Stack.Screen name={'Results'} component={Results} options={{ title: 'Resultados' }, {
                headerRight: () => (<TouchableOpacity
                    onPress={() => {
                        setAuthData({
                            rol: "",
                            dni: "",
                            campos: []
                        })
                        setResultsGlobal([])
                    }}>
                    <View style={styles.btn}><Text style={styles.btnText}>Logout</Text></View>
                </TouchableOpacity >)
            }} />
            <Stack.Screen name={'Email'} component={email} options={{ title: 'Correo' }, {
                headerRight: () => (<TouchableOpacity
                    onPress={() => {
                        setAuthData({
                            rol: "",
                            dni: "",
                            campos: []
                        })
                        setResultsGlobal([])

                    }}>
                    <View style={styles.btn}><Text style={styles.btnText}>Logout</Text></View>
                </TouchableOpacity >)
            }} />
            <Stack.Screen name={'Pdf'} component={pdf} options={{ title: 'Pdf' }, {
                headerRight: () => (<TouchableOpacity
                    onPress={() => {
                        setAuthData({
                            rol: "",
                            dni: "",
                            campos: []
                        })
                        setResultsGlobal([])

                    }}>
                    <View style={styles.btn}><Text style={styles.btnText}>Logout</Text></View>
                </TouchableOpacity >)
            }} />
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    btn: { width: 75, height: 30, backgroundColor: '#DC4120', borderRadius: 5, marginRight: 10 },
    btnText: { textAlign: 'center', color: '#fff', marginTop: 5 },

});