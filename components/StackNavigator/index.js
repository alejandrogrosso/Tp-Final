import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../../pages/login/login.js'
import Search from '../../pages/search/search.js'
import Results from '../../pages/results/results.js'
import Admin from '../../pages/admin/admin.js'


export default function StackNavigator() {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={'Admin'}>
            <Stack.Screen name={'Login'} component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name={'Search'} component={Search} options={{ title: 'Busqueda' }} />
            <Stack.Screen name={'Results'} component={Results} options={{ title: 'Resultados' }} />
            <Stack.Screen name={'Admin'} component={Admin} options={{ title: 'Administrador' }} />

        </Stack.Navigator>
    )
}