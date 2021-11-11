import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../../pages/login/login.js'
import Admin from '../../pages/admin/admin.js'


export default function StackNavigator() {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={'Admin'}>
            <Stack.Screen name={'Admin'} component={Admin} options={{ title: 'Administrador' }} />
        </Stack.Navigator>
    )
}