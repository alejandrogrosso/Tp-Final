import React from 'react';
import { Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import tablaPdf from '../../../components/pdf/tablaPdf';
import { printToFile } from '../../../components/pdf/pdf';
export default function Desplegable({ navigation, tableResults }) {

    const procesos = ["Crear PDF", "Enviar Mail"]
    return (
        <SelectDropdown
            defaultButtonText='Procesar'

            data={procesos}
            onSelect={async (selectedItem, index) => {
                const htmlResult = tablaPdf({ tableHead: tableResults.tableHead, tableData: tableResults.tableData });
                if (index == 1) {
                    navigation.navigate('Email', { htmlResult });
                } else {
                    try {
                        printToFile(htmlResult);
                    } catch (err) {
                        Alert.alert(
                            'Exportar a PDF', `Error al exportar a PDF: ${err}`
                        );
                    }
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