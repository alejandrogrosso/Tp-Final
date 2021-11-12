import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Desplegable from './components/desplegable.js'
import Constants from "expo-constants";
import clientesServices from '../../services/clientesServices';
import { object } from 'prop-types';

export default function TablaResultados() {
  const [dataClientes, setDataClientes] = useState({
    tableHead: [],
    tableData: []
  })

  useEffect(() => {
    (async () => {
      function retornaCampos() {
        var arrayCampos = [];
        for (let x of response.data) {
          arrayCampos = Object.keys(x);
        }
        return arrayCampos
      }
      const response = await clientesServices.getClientes();
      const aux = {
        tableData: response.data.map((values) => {
          var arrayValores = [];
          for (let x of Object.entries(values)) {
            console.log(x);
            if (x[0] !== '_id') {
              arrayValores.push(x[1]);
            }
          }
          return arrayValores

        }),
        tableHead: retornaCampos().filter(valor => valor !== '_id')
      }
      setDataClientes(aux);


    })()
  }, [])
  return (


    <View style={styles.container}>

      <Desplegable />

      <View style={{ margin: 10 }}></View>

      <ScrollView horizontal={true} >
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={dataClientes.tableHead} style={styles.header} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {
                dataClientes.tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    style={[styles.row]}
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


const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', backgroundColor: "#fff", marginTop: Constants.statusBarHeight, alignItems: 'center' },
  header: { height: 50, backgroundColor: '#7EBBEF' },
  text: { textAlign: 'center', fontWeight: '100', width: 150 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#C4D7E7' },
  espacio: { margin: 50 },
});