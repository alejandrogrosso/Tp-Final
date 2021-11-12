import React from 'react';
import SelectDropdown from 'react-native-select-dropdown'
export default function Desplegable() {

    const procesos = ["Crear PDF", "Enviar Mail", "Imprimir"]
    return (
        <SelectDropdown
            defaultButtonText='Procesar'

            data={procesos}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
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