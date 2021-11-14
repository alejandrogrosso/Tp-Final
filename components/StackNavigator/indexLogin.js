import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../../pages/login/login.js'

export default function StackNavigator() {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen name={'Login'} component={Login} options={{ title: 'Login' }} />

        </Stack.Navigator>
    )
}
