import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Search from '../../pages/search/search.js'
import Results from '../../pages/results/results.js'
import LogoutBtn from '../logoutBtn/logoutBtn.js';
import email from '../../pages/email/email.js';

export default function StackNavigator() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={'Search'}>
            <Stack.Screen name={'Search'} component={Search} options={{ title: 'Busqueda' }, {
                headerRight: () => (<LogoutBtn />)
            }} />
            <Stack.Screen name={'Results'} component={Results} options={{ title: 'Resultados' }, {
                headerRight: () => (<LogoutBtn />)
            }} />
            <Stack.Screen name={'Email'} component={email} options={{ title: 'Correo' }, {
                headerRight: () => (<LogoutBtn />)
            }} />
        </Stack.Navigator>
    )
}