import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../assets/Colors';

type Props = {
  idCliente: string,
  nombre: string,
  apPaterno: string,
  apMaterno: string,
  telefono: string,
  correo: string,
  domicilio: object,
  color ? : boolean
}

export default class ListItem_Clientes extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }
  
  _mostrarDato(dato) {
    if (dato)
      return (
        <Text>
          {dato}
        </Text>
      );
  }

  render() {
    const { id, nombre, apPaterno, apMaterno, telefono, correo, color } = this.props
    return (
      <View style={[styles.root, { backgroundColor: color ? 'gold' : 'white' }]}>
        <View style={styles.containerCliente}>
          <Text style={styles.textCliente}>
            {nombre} {apPaterno} {apMaterno || ''}
          </Text>
          {this._mostrarDato(telefono)}
          {this._mostrarDato(correo)}
        </View>
        <View style={styles.containerIcono}>
          <Icon name='chevron-right' color={Colors.gray} size={30}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    borderColor: 'black',
    elevation: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 2,
  },
  containerCliente: {
    padding: 20,
    width: '90%',
  },
  textCliente: {
    fontSize: 16
  },
  containerIcono: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '10%',
  }
});