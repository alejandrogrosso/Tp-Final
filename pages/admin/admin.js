import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import clientesServices from '../../services/clientesServices';
import Constants from "expo-constants";


export default function TableAdmin(props) {
  const navigation = props.navigation;
  const [dataUsers, setDataUsers] = useState({
    tableHead: ['Dni', 'Nombre', 'Apellido', 'Rol', '-'],
    tableData: []
  })

  useEffect(() => {
    (async () => {
      const response = await clientesServices.getUsuarios();
      const aux = {
        tableData: response.data.map((values) => Object.values(values)),
        tableHead: dataUsers.tableHead
      }
      setDataUsers(aux);
      console.log(aux)

    })()
  }, [])
  const setAdmin = (user) => {
    let newValores = { ...dataUsers };

    newValores[campo] = {
      
    };

    setValores(newValores);
  };
  const element = (usuarios) => (

    < TouchableOpacity onPress={() => setAdmin(usuarios)
    }>

      <View style={styles.btn}>
        <Text style={styles.btnText}>Admin</Text>
      </View>
    </TouchableOpacity >
  );


  return (

    < View style={styles.container} >
      <ScrollView horizontal={true}>
        <Table borderStyle={{ borderColor: 'transparent' }}>
          <Row data={dataUsers.tableHead} style={styles.head} textStyle={styles.text} />
          {
            dataUsers.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                <>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellData} textStyle={styles.text} />
                    ))
                  }
                  <Cell data={element(rowData)} textStyle={styles.text} />
                </>
              </TableWrapper>
            ))
          }
        </Table>
      </ScrollView>
    </View >
  )
}


const styles = StyleSheet.create({
  container: { marginTop: Constants.statusBarHeight, padding: 16, paddingTop: 30, backgroundColor: '#fff', backgroundColor: "#fff", },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  espacio: { margin: 50 }
});