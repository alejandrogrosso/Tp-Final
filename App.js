import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import Login from './pages/login/login.js'
import Search from './pages/search/search.js'
import Results from './pages/results/results.js'
import Admin from './pages/admin/admin.js'
import Desplegable from './pages/results/components/desplegable.js'
import Constants from "expo-constants";


export default function App() {

  return (

    <Search />


  );
}
const styles = StyleSheet.create({


});