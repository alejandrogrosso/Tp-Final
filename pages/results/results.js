import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Desplegable from './components/desplegable.js'
import Constants from "expo-constants";

export default function TablaResultados() {
  const [dataEmpleados, setDataEmpleados] = useState({
    tableHead: [],
    tableData: []
  })

  useEffect(() => {
    (async () => {
      const response = await clientesServices.getClientes();
      const aux = {
        tableData: response.data.map((values) => Object.values(values)),
        tableHead: dataUsers.tableHead
      }
      setDataEmpleados(aux);
      console.log(aux)

    })()
  }, [])




  const tableData = [];
  for (let i = 0; i < 10; i += 1) {
    const rowData = [];
    for (let j = 0; j < 5; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);


    return (


      <View style={styles.container}>

        <Desplegable />

        <View style={{ margin: 10 }}></View>

        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', backgroundColor: "#fff", marginTop: Constants.statusBarHeight, alignItems: 'center' },
  header: { height: 50 },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  espacio: { margin: 50 },
});