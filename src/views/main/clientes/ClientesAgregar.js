import React from 'react';
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BackHandledComponent from '../../../components/BackHandledComponent';
import { GET_Clientes as getClientes } from '../../../api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';

export default class ClientesAgregar extends BackHandledComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, marginTop: 5}}>
      <Text>Agregar cliente</Text>
      </View>
    )
  }
}