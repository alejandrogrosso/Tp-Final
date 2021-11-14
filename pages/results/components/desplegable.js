import React from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import clientesServices from '../../../services/clientesServices';
import pdf from '../../pdf/pdf';
export default function Desplegable({ navigation }) {

    const procesos = ["Crear PDF", "Enviar Mail"]
    return (
        <SelectDropdown
            defaultButtonText='Procesar'

            data={procesos}
            onSelect={async (selectedItem, index) => {
                console.log('', index, selectedItem)
                if (index == 1) {
                    console.log('CORREO', index, selectedItem)
                    navigation.navigate('Email');
                } else {
                    console.log('PDF', index, selectedItem)
                    navigation.navigate('Pdf');
                }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
    );
}