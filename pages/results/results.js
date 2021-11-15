import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import Desplegable from './components/desplegable.js'
import Constants from "expo-constants";
import GlobalContext from '../../components/globals/context.js';
import _ from 'lodash'

export default function TablaResultados({ navigation }) {
  const { AuthData, resultsGlobal } = useContext(GlobalContext);
  const [dataClientes, setDataClientes] = useState({
    tableHead: [],
    tableData: []
  });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    (async () => {
      const response = resultsGlobal.map(item => {
        const headers = _.intersection(Object.keys(item), AuthData.campos)
        const resultsCampos = _.pickBy(item, (value, key) => {
          if (key == 'saldo' && AuthData.campos.includes('saldoMin')) {
            return true
          }
          return headers.includes(key)
        })

        return resultsCampos;
      })

      const aux = {
        tableData: response.map((values) => {
          var arrayValores = [];
          for (let x of Object.entries(values)) {
            if (x[0] !== '_id') {
              arrayValores.push(x[1]);
            }
          }
          return arrayValores
        }),
        tableHead: response.length > 0 ? Object.keys(_.first(response)).filter(valor => valor !== '_id') : []
      }
      setDataClientes(aux);
      setCargando(false);
    })()
  }, []);

  return (
    <View style={styles.container}>
      {dataClientes.tableData.length > 0 && <Desplegable tableResults={dataClientes} navigation={navigation} />}
      <View style={{ margin: 10 }}></View>
      <ScrollView horizontal={true} >
        <View>
          {dataClientes.tableData.length > 0 &&
            <>
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
            </>}
          {cargando && <Text>Cargando ...</Text>}
          {!cargando && dataClientes.tableData.length == 0 && <Text>No hay resultados.</Text>}
        </View>
      </ScrollView>
    </View >
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', backgroundColor: "#fff", alignItems: 'center' },
  header: { height: 50, backgroundColor: '#7EBBEF' },
  text: { textAlign: 'center', fontWeight: '100', width: 150 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#C4D7E7' },
  espacio: { margin: 50 },
});