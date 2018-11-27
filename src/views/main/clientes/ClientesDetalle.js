import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackHandledComponent from '../../../components/BackHandledComponent';
import { GET_Clientes as getClientes } from '../../../api';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';
import Colors from '../../../assets/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextDataWithIcon from '../../../components/TextDataWithIcon';

export default class ClientesDetalle extends BackHandledComponent {
  constructor(props) {
    super(props);
    this.state = {
      cliente: props.cliente
    }
  }

  _nombreToString(nombre, apPaterno, apMaterno) {
    return `${nombre} ${apPaterno} ${apMaterno || ''}`;
  }

  _domicilioToString(domicilio) {
    if (domicilio) {
      const { calle, noExterno, noInterno, colonia, municipio, estado, cp, referencia } = domicilio;
      const stringDomicilio = `${calle || ''} ${noExterno || ''} ${(noInterno) ? 'Interior: ' + noInterno : ''}, ${colonia}, ${municipio}, ${estado}, ${cp}
${(referencia) ? 'Referencia: ' + referencia : ''}`;
      return stringDomicilio;
    }
    return '';
  }

  _mostrarDatos(datos) {
    let componentes = [];
    for (const dato in datos) {
      componentes.push(this._mostrarDato(dato, datos[dato]))
    }
    return componentes;
  }

  render() {
    const { nombre, apPaterno, apMaterno, telefono, correo, domicilio } = this.state.cliente;
    return (
      <View style={styles.container}>
        <TextDataWithIcon
          label={'Nombre'}
          icon={'person'}
          styleDescription={styles.title}
          description={this._nombreToString(nombre, apPaterno, apMaterno)}
        >
        </TextDataWithIcon>
        <TextDataWithIcon
          label={'Teléfono'}
          icon={'phone'}
          styleDescription={styles.dataText}
          description={telefono}
        >
        </TextDataWithIcon>
        <TextDataWithIcon
          label={'Correo'}
          icon={'email'}
          styleDescription={styles.dataText}
          description={correo}
        >
        </TextDataWithIcon>
        <TextDataWithIcon
          label={'Domicilio'}
          icon={'home'}
          styleDescription={styles.dataText}
          description={this._domicilioToString(domicilio)}
        >
        </TextDataWithIcon>
        <ActionButton 
          buttonColor={Colors.info} 
          renderIcon={active => (<Icon name="settings" style={styles.actionButtonIcon}/>)}>
        >
          <ActionButton.Item 
            buttonColor={Colors.primary} 
            title="Editar" 
            onPress={() => { Actions.clientesEditar({cliente: this.state.cliente}) }}
          >
            <Icon name="edit" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item 
            buttonColor={Colors.danger} 
            title="Eliminar" 
            onPress={() => {
              Alert.alert('Eliminar cliente','¿Está seguro de que desea eliminar este cliente?',
                [
                  {text: 'Sí', onPress: () => Actions.clientesDetalle({cliente: data})},
                  {text: 'No'},
                ],
                { cancelable: true }
              );
            }}
          >
            <Icon name="delete" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dataText: {
    fontSize: 18
  },
  actionButtonIcon: {
    color: Colors.white,
    fontSize: 20
  }
});