import React from 'react';
import BackHandledComponent from '../../../components/BackHandledComponent';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Color from '../../../assets/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { POST_Clientes as registrarCliente} from '../../../api';
import TextField from '../../../components/TextField';
import validate from '../../../utils/validationWrapper';
import Colors from '../../../assets/Colors';

export default class ClientesAgregar extends BackHandledComponent {
  state = {
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
    },
    errores: {
      errorNombre: '',
      errorApPaterno: '',
      errorApMaterno: '',
      errorTelefono: '',
      errorCorreo: '',
      errorDomicilio: {
        errorCalle: '',
        errorNoExterno: '',
        errorNoInterno: '',
        errorColonia: '',
        errorMunicipio: '',
        errorEstado: '',
        errorCp: '',
        errorReferencia: '',
      }
    },
  }

  _validarFormulario() {
    this.setState({
      errores: {
        errorNombre: validate('userDataRequired', this.state.nombre),
        errorApPaterno: validate('userDataRequired', this.state.apPaterno),
        errorApMaterno: validate('userData', this.state.apMaterno),
        errorTelefono: validate('phone', this.state.telefono),
        errorCorreo: validate('email', this.state.correo),
        errorDomicilio: {
          errorCalle: validate('addressName', this.state.domicilio.calle),
          errorNoExterno: validate('addressNumber', this.state.domicilio.noExterno),
          errorNoInterno: validate('addressNumber', this.state.domicilio.noInterno),
          errorColonia: validate('userDataRequired', this.state.domicilio.colonia),
          errorMunicipio: validate('addressName', this.state.domicilio.municipio),
          errorEstado: validate('addressName', this.state.domicilio.estado),
          errorCp: validate('postalCode', this.state.domicilio.cp),
          errorReferencia: validate('userData', this.state.domicilio.referencia),
        }
      }
    }, () => {
      const validezFormulario = this._asignarValidezFormulario(this.state.errores);
      console.log(validezFormulario)
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
    console.log('entra registrar')
    const { nombre, apPaterno, apMaterno, correo, contrasena } = this.state;
    const usuario = { nombre, apPaterno, apMaterno, correo, contrasena };
    registrarCliente(usuario).then(data => {
      console.log(data)
      Alert.alert('','Registro realizado con éxito',
        [
          {text: 'Ok', onPress: () => Actions.login()},
        ],
        { cancelable: false }
      );
    }).catch(response => {
      console.log(response)
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
          onChangeText={(nombre) => this.setState({nombre})}
          value={this.state.nombre}
          placeholder={'Nombre(s)'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_nombre = input}}
          onSubmitEditing={ () => { this.tb_apPaterno.input.focus()} }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorNombre: validate('userDataRequired', this.state.nombre),
              }
            })
          }}
          error={this.state.errores.errorNombre}
        />
        <TextField
          autoCapitalize={'words'}
          style={[styles.textInput]}
          onChangeText={(apPaterno) => this.setState({apPaterno})}
          value={this.state.apPaterno}
          placeholder={'Apellido paterno'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_apPaterno = input}}
          onSubmitEditing={ () => { this.tb_apMaterno.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorApPaterno: validate('userDataRequired', this.state.apPaterno),
              }
            })
          }}
          error={this.state.errores.errorApPaterno}
        />
        <TextField
          autoCapitalize={'words'}
          style={[styles.textInput]}
          onChangeText={(apMaterno) => this.setState({apMaterno})}
          value={this.state.apMaterno}
          placeholder={'Apellido materno'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_apMaterno = input}}
          onSubmitEditing={ () => { this.tb_correo.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorApMaterno: validate('userData', this.state.apMaterno),
              }
            })
          }}
          error={this.state.errores.errorApMaterno}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          style={[styles.textInput]}
          onChangeText={(correo) => {this.setState({correo})}}
          value={this.state.correo}
          placeholder={'Correo'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_correo = input}}
          onSubmitEditing={ () => { this.tb_telefono.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorCorreo: validate('email', this.state.correo),
              }
            })
          }}
          error={this.state.errores.errorCorreo}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'phone-pad'}
          style={[styles.textInput]}
          onChangeText={(telefono) => this.setState({telefono})}
          value={this.state.telefono}
          placeholder={'Teléfono'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_telefono = input}}
          onSubmitEditing={ () => { this.tb_calle.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorTelefono: validate('phone', this.state.telefono),
              }
            })
          }}
          error={this.state.errores.errorTelefono}
        />
        <Text>Domicilio</Text>
        <TextField
          autoCapitalize={'words'}
          keyboardType={'default'}
          style={[styles.textInput]}
          onChangeText={(calle) => this.setState({domicilio: {...this.state.domicilio, calle}})}
          value={this.state.calle}
          placeholder={'Calle'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_calle = input}}
          onSubmitEditing={ () => { this.tb_noExterno.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorDomicilio: {
                  ...this.state.errores.errorDomicilio,
                  errorCalle: validate('addressName', this.state.domicilio.calle)
                },
              }
            })
          }}
          error={this.state.errores.errorDomicilio.errorCalle}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'numeric'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(noExterno) => this.setState({domicilio: {...this.state.domicilio, noExterno}})}
          value={this.state.noExterno}
          placeholder={'No. externo'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_noExterno = input}}
          onSubmitEditing={ () => { this.tb_noInterno.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorDomicilio: {
                  ...this.state.errores.errorDomicilio,
                  errorNoExterno: validate('addressNumber', this.state.domicilio.noExterno)
                },
              }
            })
          }}
          error={this.state.errores.errorDomicilio.errorNoExterno}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'numeric'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(noInterno) => this.setState({domicilio: {...this.state.domicilio, noInterno}})}
          value={this.state.noInterno}
          placeholder={'No. interno'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_noInterno = input}}
          onSubmitEditing={ () => { this.tb_colonia.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorDomicilio: {
                  ...this.state.errores.errorDomicilio,
                  errorNoInterno: validate('addressNumber', this.state.domicilio.noInterno)
                },
              }
            })
          }}
          error={this.state.errores.errorDomicilio.errorNoInterno}
        />
        <TextField
          autoCapitalize={'words'}
          keyboardType={'default'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(colonia) => this.setState({domicilio: {...this.state.domicilio, colonia}})}
          value={this.state.colonia}
          placeholder={'Colonia'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_colonia = input}}
          onSubmitEditing={ () => { this.tb_municipio.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorDomicilio: {
                  ...this.state.errores.errorDomicilio,
                  errorColonia: validate('addressName', this.state.domicilio.colonia)
                },
              }
            })
          }}
          error={this.state.errores.errorDomicilio.errorColonia}
        />
        <TextField
          autoCapitalize={'words'}
          keyboardType={'default'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(municipio) => this.setState({domicilio: {...this.state.domicilio, municipio}})}
          value={this.state.municipio}
          placeholder={'Municipio'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_municipio = input}}
          onSubmitEditing={ () => { this.tb_estado.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorDomicilio: {
                  ...this.state.errores.errorDomicilio,
                  errorMunicipio: validate('addressName', this.state.domicilio.municipio)
                },
              }
            })
          }}
          error={this.state.errores.errorDomicilio.errorMunicipio}
        />
        <TextField
          autoCapitalize={'words'}
          keyboardType={'default'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(estado) => this.setState({domicilio: {...this.state.domicilio, estado}})}
          value={this.state.estado}
          placeholder={'Estado'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_estado = input}}
          onSubmitEditing={ () => { this.tb_cp.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorDomicilio: {
                  ...this.state.errores.errorDomicilio,
                  errorEstado: validate('addressName', this.state.domicilio.estado)
                },
              }
            })
          }}
          error={this.state.errores.errorDomicilio.errorEstado}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'number-pad'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(cp) => this.setState({domicilio: {...this.state.domicilio, cp}})}
          value={this.state.cp}
          placeholder={'Código Postal'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_cp = input}}
          onSubmitEditing={ () => { this.tb_referencia.input.focus() } }
          returnKeyType={'next'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorDomicilio: {
                  ...this.state.errores.errorDomicilio,
                  errorCp: validate('postalCode', this.state.domicilio.cp)
                },
              }
            })
          }}
          error={this.state.errores.errorDomicilio.errorCp}
        />
        <TextField
          autoCapitalize={'none'}
          keyboardType={'default'}
          style={[styles.textInput, styles.textInputSmall]}
          onChangeText={(referencia) => this.setState({domicilio: {...this.state.domicilio, referencia}})}
          value={this.state.referencia}
          placeholder={'Referencia'}
          placeholderTextColor={'#999999'}
          ref={input => {this.tb_referencia = input}}
          onSubmitEditing={ () => { this._validarFormulario() } }
          returnKeyType={'done'}
          onBlur={() => {
            this.setState({
              errores: {
                ...this.state.errores,
                errorDomicilio: {
                  ...this.state.errores.errorDomicilio,
                  errorReferencia: validate('userData', this.state.domicilio.referencia)
                },
              }
            })
          }}
          error={this.state.errores.errorDomicilio.referencia}
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