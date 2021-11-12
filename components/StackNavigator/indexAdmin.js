import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../../pages/login/login.js'
import Admin from '../../pages/admin/admin.js'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlobalContext from '../../components/globals/context.js';


export default function StackNavigator() {
    const { AuthData, setAuthData } = useContext(GlobalContext)
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={'Admin'}>
            <Stack.Screen name={'Admin'} component={Admin} options={{ title: 'Administrador' }, {
                headerRight: () => (<TouchableOpacity
                    onPress={() => {
                        setAuthData({
                            rol: "",
                            dni: "",
                        })
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