import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
 
export default class TableAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['-', 'Nombre', 'Apellido', 'Rol'],
      tableData: [
        ['1', 'Juan', 'Perez', '4'],
        ['2', 'Juana', 'Lopez', 'd'],
        ['3', 'Pedro', 'Gomez', '4'],
        ['4', 'Maria', 'Rodriguez', 'd']
      ]
    }
  }
 
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }
 
  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>setRol</Text>
        </View>
      </TouchableOpacity>
    );
 
    return (
      <View style={styles.container}>

        <View style={styles.espacio}></View>
        <Text>Admin</Text>
        <View style={styles.espacio}></View>

        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', backgroundColor: "#fff", },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  espacio:{ margin:50}
});