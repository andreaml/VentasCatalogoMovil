import React from 'react';
import BackHandledComponent from '../../../components/BackHandledComponent';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Color from '../../../assets/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { POST_Clientes as registrarCliente } from '../../../api';
import TextField from '../../../components/TextField';
import validate from '../../../utils/validationWrapper';
import Colors from '../../../assets/Colors';

export default class ClientesAgregar extends BackHandledComponent {
  state = {
    cliente: {
      nombre: '',
      apPaterno: '',
      apMaterno: '',
      telefono: '',
      correo: '',
      domicilio: {
          calle: '',
          noExterno: '',
          noInterno: '',
          colonia: '',
          municipio: '',
          estado: '',
          cp: '',
          referencia: '',
      }
    },
    errores: {
      nombre: '',
      apPaterno: '',
      apMaterno: '',
      telefono: '',
      correo: '',
      domicilio: {
        calle: '',
        noExterno: '',
        noInterno: '',
        colonia: '',
        municipio: '',
        estado: '',
        cp: '',
        referencia: '',
      }
    },
  }

  _validarFormulario() {
    this.setState({
      errores: {
        nombre: validate('userDataRequired', this.state.cliente.nombre),
        apPaterno: validate('userDataRequired', this.state.cliente.apPaterno),
        apMaterno: validate('userData', this.state.cliente.apMaterno),
        telefono: validate('phone', this.state.cliente.telefono),
        correo: validate('email', this.state.cliente.correo),
        domicilio: {
          calle: validate('addressName', this.state.cliente.domicilio.calle),
          noExterno: validate('addressNumber', this.state.cliente.domicilio.noExterno),
          noInterno: validate('addressNumber', this.state.cliente.domicilio.noInterno),
          colonia: validate('userDataRequired', this.state.cliente.domicilio.colonia),
          municipio: validate('addressName', this.state.cliente.domicilio.municipio),
          estado: validate('addressName', this.state.cliente.domicilio.estado),
          cp: validate('postalCode', this.state.cliente.domicilio.cp),
          referencia: validate('userData', this.state.cliente.domicilio.referencia),
        }
      }
    }, () => {
      const validezFormulario = this._asignarValidezFormulario(this.state.errores);
      if (validezFormulario) {
        this.registrarCliente();
      } else {
        Alert.alert('Error en el registro','Verifique los datos ingresados, por favor.',
          [
            {text: 'Ok'},
          ],
          { cancelable: false }
        );
      }
    });
  }

  _asignarValidezFormulario = (errores) => {
    for (const index in errores) {
      if (typeof errores[index] == 'object') {
        if (!this._asignarValidezFormulario(errores[index]))
          return false;
      } else if (errores[index]) {
        return false;
      }
    }
    return true;
  }

  registrarCliente() {
    const { cliente } = this.state;
    registrarCliente(cliente).then(data => {
      Alert.alert('','Registro realizado con éxito',
        [
          {text: 'Ok', onPress: () => Actions.clientesDetalle({cliente: data})},
        ],
        { cancelable: false }
      );
    }).catch(response => {
      if (response.status == 400) {
        Alert.alert('Error en el registro', 'Verifique los datos ingresados', [{
            text: 'Ok'
          }], {
            cancelable: false
        });
      } else {
        Alert.alert('Error en el registro', 'No se puede registrar en este momento, inténtelo mas tarde', [{
            text: 'Ok'
          }], {
            cancelable: false
        });
      }
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView 
      style={{flex: 1}}
      contentContainerStyle={styles.container}
      >
        <TextField
          autoCapitalize={'words'}
          style={[styles.textInput]}
          onChangeText={(nombre) => this.setState({cliente: {...this.state.cliente, nombre}})}
          value={this.state.cliente.nombre}
          placeholder={'Nombre(s)'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_nombre = input}}
          onSubmitEditing={ () => { this.tb_apPaterno.input.focus()} }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                nombre: validate('userDataRequired', this.state.cliente.nombre),
              }
            })
          }}
          error={this.state.errores.nombre}
        />
        <TextField
          autoCapitalize={'words'}
          style={[styles.textInput]}
          onChangeText={(apPaterno) => this.setState({cliente: {...this.state.cliente, apPaterno}})}
          value={this.state.cliente.apPaterno}
          placeholder={'Apellido paterno'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_apPaterno = input}}
          onSubmitEditing={ () => { this.tb_apMaterno.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                apPaterno: validate('userDataRequired', this.state.cliente.apPaterno),
              }
            })
          }}
          error={this.state.errores.apPaterno}
        />
        <TextField
          autoCapitalize={'words'}
          style={[styles.textInput]}
          onChangeText={(apMaterno) => this.setState({cliente: {...this.state.cliente, apMaterno}})}
          value={this.state.cliente.apMaterno}
          placeholder={'Apellido materno'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_apMaterno = input}}
          onSubmitEditing={ () => { this.tb_correo.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                apMaterno: validate('userData', this.state.cliente.apMaterno),
              }
            })
          }}
          error={this.state.errores.apMaterno}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          style={[styles.textInput]}
          onChangeText={(correo) => {this.setState({cliente: {...this.state.cliente, correo}})}}
          value={this.state.cliente.correo}
          placeholder={'Correo'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_correo = input}}
          onSubmitEditing={ () => { this.tb_telefono.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                correo: validate('email', this.state.cliente.correo),
              }
            })
          }}
          error={this.state.errores.correo}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'phone-pad'}
          style={[styles.textInput]}
          onChangeText={(telefono) => this.setState({cliente: {...this.state.cliente, telefono}})}
          value={this.state.cliente.telefono}
          placeholder={'Teléfono'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_telefono = input}}
          onSubmitEditing={ () => { this.tb_calle.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                telefono: validate('phone', this.state.cliente.telefono),
              }
            })
          }}
          error={this.state.errores.telefono}
        />
        <Text>Domicilio</Text>
        <TextField
          autoCapitalize={'words'}
          style={[styles.textInput]}
          onChangeText={(calle) => this.setState({cliente: {...this.state.cliente, domicilio: {...this.state.cliente.domicilio, calle}}})}
          value={this.state.cliente.domicilio.calle}
          placeholder={'Calle'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_calle = input}}
          onSubmitEditing={ () => { this.tb_noExterno.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                domicilio: {
                  ...this.state.errores.domicilio,
                  calle: validate('addressName', this.state.cliente.domicilio.calle)
                },
              }
            })
          }}
          error={this.state.errores.domicilio.calle}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'numeric'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(noExterno) => this.setState({cliente: {...this.state.cliente, domicilio: {...this.state.cliente.domicilio, noExterno}}})}
          value={this.state.cliente.domicilio.noExterno}
          placeholder={'No. externo'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_noExterno = input}}
          onSubmitEditing={ () => { this.tb_noInterno.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                domicilio: {
                  ...this.state.errores.domicilio,
                  noExterno: validate('addressNumber', this.state.cliente.domicilio.noExterno)
                },
              }
            })
          }}
          error={this.state.errores.domicilio.noExterno}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'numeric'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(noInterno) => this.setState({cliente: {...this.state.cliente, domicilio: {...this.state.cliente.domicilio, noInterno}}})}
          value={this.state.cliente.domicilio.noInterno}
          placeholder={'No. interno'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_noInterno = input}}
          onSubmitEditing={ () => { this.tb_colonia.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                domicilio: {
                  ...this.state.errores.domicilio,
                  noInterno: validate('addressNumber', this.state.cliente.domicilio.noInterno)
                },
              }
            })
          }}
          error={this.state.errores.domicilio.noInterno}
        />
        <TextField
          autoCapitalize={'words'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(colonia) => this.setState({cliente: {...this.state.cliente, domicilio: {...this.state.cliente.domicilio, colonia}}})}
          value={this.state.cliente.domicilio.colonia}
          placeholder={'Colonia'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_colonia = input}}
          onSubmitEditing={ () => { this.tb_municipio.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                domicilio: {
                  ...this.state.errores.domicilio,
                  colonia: validate('addressName', this.state.cliente.domicilio.colonia)
                },
              }
            })
          }}
          error={this.state.errores.domicilio.colonia}
        />
        <TextField
          autoCapitalize={'words'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(municipio) => this.setState({cliente: {...this.state.cliente, domicilio: {...this.state.cliente.domicilio, municipio}}})}
          value={this.state.cliente.domicilio.municipio}
          placeholder={'Municipio'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_municipio = input}}
          onSubmitEditing={ () => { this.tb_estado.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                domicilio: {
                  ...this.state.errores.domicilio,
                  municipio: validate('addressName', this.state.cliente.domicilio.municipio)
                },
              }
            })
          }}
          error={this.state.errores.domicilio.municipio}
        />
        <TextField
          autoCapitalize={'words'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(estado) => this.setState({cliente: {...this.state.cliente, domicilio: {...this.state.cliente.domicilio, estado}}})}
          value={this.state.cliente.domicilio.estado}
          placeholder={'Estado'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_estado = input}}
          onSubmitEditing={ () => { this.tb_cp.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                domicilio: {
                  ...this.state.errores.domicilio,
                  estado: validate('addressName', this.state.cliente.domicilio.estado)
                },
              }
            })
          }}
          error={this.state.errores.domicilio.estado}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'number-pad'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(cp) => this.setState({cliente: {...this.state.cliente, domicilio: {...this.state.cliente.domicilio, cp}}})}
          value={this.state.cliente.domicilio.cp}
          placeholder={'Código Postal'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_cp = input}}
          onSubmitEditing={ () => { this.tb_referencia.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                domicilio: {
                  ...this.state.errores.domicilio,
                  cp: validate('postalCode', this.state.cliente.domicilio.cp)
                },
              }
            })
          }}
          error={this.state.errores.domicilio.cp}
        />
        <TextField
          autoCapitalize={'none'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(referencia) => this.setState({cliente: {...this.state.cliente, domicilio: {...this.state.cliente.domicilio, referencia}}})}
          value={this.state.cliente.domicilio.referencia}
          placeholder={'Referencia'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_referencia = input}}
          onSubmitEditing={ () => { this._validarFormulario() } }
          returnKeyType={'done'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                domicilio: {
                  ...this.state.errores.domicilio,
                  referencia: validate('userData', this.state.cliente.domicilio.referencia)
                },
              }
            })
          }}
          error={this.state.errores.domicilio.referencia}
        />
        <TouchableOpacity onPress={() => {this._validarFormulario()}} style={styles.button}>
          <Text style={styles.textButton}>
            Registrar
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    flexDirection: 'column'
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    marginTop: 20
  },
  textInput: {
    alignItems: 'center',
    borderColor: 'lightgray',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 18,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: Color.primary,
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 10,
    width: '80%',
  },
  textButton: {
    color: Color.white,
    fontSize: 15,
    marginVertical: 10,
  }
})