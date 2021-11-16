import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import clientesServices from '../../services/clientesServices';
import Constants from "expo-constants";
import ModalSelector from 'react-native-modal-selector'
const roles = [
  { key: 'Admin', label: 'Admin' },
  { key: 'Empleado', label: 'Empleado' },
  { key: 'Gerente', label: 'Gerente' }
]

export default function TableAdmin(props) {
  //const navigation = props.navigation;
  const [dataUsers, setDataUsers] = useState({
    tableHead: ['Dni', 'Nombre', 'Apellido', 'Rol',],
    tableData: []
  })
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    downloadUsers()
  }, [])

  const downloadUsers = async () => {
    const response = await clientesServices.getUsuarios();
    const aux = {
      tableData: response.data,
      tableHead: dataUsers.tableHead
    }
    setDataUsers(aux);
  }

  const updateUserRole = async (rol) => {
    await clientesServices.updateUsuario(selectedUser._id, rol.key);
    await downloadUsers()
  };

  const element = (usuario) => (
    < TouchableOpacity onPress={() => {
      setModalOpened(true);
      setSelectedUser(usuario);
    }}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{usuario.rol}</Text>
      </View>
    </TouchableOpacity >
  );

  return (
    < View style={styles.container} >
      <ModalSelector
        customSelector={<></>}
        visible={modalOpened}
        onModalClose={() => setModalOpened(false)}
        data={roles}
        initValue=""
        onChange={(option) => { updateUserRole(option) }} />
      <ScrollView horizontal={true}>
        <Table borderStyle={{ borderColor: 'transparent' }}>
          <Row data={dataUsers.tableHead} style={styles.head} textStyle={styles.text} />
          {
            dataUsers.tableData.map((item, index) => {
              const keyValues = Object.entries(item)
              return (
                <TableWrapper key={index} style={styles.row}>
                  <>
                    {
                      keyValues.filter(keyValue => keyValue[0] !== '_id' && keyValue[0] !== 'rol' && keyValue[0] !== 'pass').map((keyValue, cellIndex) => {
                        const [key, value] = keyValue
                        return <Cell key={cellIndex} data={value} textStyle={styles.text} />
                      })
                    }
                    <Cell data={element(item)} textStyle={styles.text} />
                  </>
                </TableWrapper>
              )
            })
          }
        </Table>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingTop: 30, backgroundColor: '#fff', backgroundColor: "#fff", },
  head: { height: 40, backgroundColor: '#7EBBEF' },
  text: { margin: 6, width: 100 },
  row: { flexDirection: 'row', backgroundColor: '#C4D7E7' },
  btn: { width: 100, height: 18, backgroundColor: '#7EBBEF', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#000000' },
  espacio: { margin: 50 }
});