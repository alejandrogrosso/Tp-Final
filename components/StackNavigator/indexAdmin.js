import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Admin from '../../pages/admin/admin.js'
import LogoutBtn from '../logoutBtn/logoutBtn.js';

export default function StackNavigator() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={'Admin'}>
            <Stack.Screen name={'Admin'} component={Admin} options={{ title: 'Administrador' }, {
                headerRight: () => (<LogoutBtn />)
            }} />
        </Stack.Navigator>
    )
}