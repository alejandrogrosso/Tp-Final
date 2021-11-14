import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlobalContext from '../../components/globals/context.js';

export default function LogoutBtn() {
    const { setAuthData, setResultsGlobal } = useContext(GlobalContext)

    return (
        <TouchableOpacity
            onPress={() => {
                setAuthData({
                    rol: "",
                    dni: "",
                    campos: []
                })
                setResultsGlobal([])
            }}>
            <View style={styles.btn}><Text style={styles.btnText}>Logout</Text></View>
        </TouchableOpacity >
    )
}
const styles = StyleSheet.create({
    btn: { width: 75, height: 30, backgroundColor: '#DC4120', borderRadius: 5, marginRight: 10 },
    btnText: { textAlign: 'center', color: '#fff', marginTop: 5 },
});