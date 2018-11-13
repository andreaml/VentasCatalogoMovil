import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, AsyncStorage, BackHandler} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Color from '../assets/Colors';
import BackHandledComponent from '../components/BackHandledComponent'
import {iniciarSesion} from '../api/apiClient';
import Axios from 'axios';

export default class Login extends Component {
    state = {
        correo: '',
        contrasena: ''
    }

    componentDidMount() {
        this.handleBackPress = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.handleBackPress.remove(); 
    }

    handleBackPress = () => {
        BackHandler.exitApp();
    }

    iniciar() {
        const {correo, contrasena} = this.state;
        iniciarSesion(correo, contrasena).then(data => {
            // guardamos el token y esa wea
            Axios.defaults.headers.common['Authorization'] = data.token;
            AsyncStorage.setItem("Token", data.token).then(() => {
                Actions.main();
            });
        }).catch(response => {
            if (response.status == 400) {
                Alert.alert('Error al iniciar sesión', 'Verifique que el correo esté bien escrito', [{
                    text: 'Ok'
                }], {
                    cancelable: false
                })
            } else if (response.status == 401){
                Alert.alert('Error al iniciar sesión', 'Usuario y/o contraseña incorrectos', [{
                    text: 'Ok'
                }], {
                    cancelable: false
                })
            } else {
                console.error(response);
                Alert.alert('Error al iniciar sesión', 'No se puede iniciar sesión en este momento, inténtelo mas tarde', [{
                    text: 'Ok'
                }], {
                    cancelable: false
                })
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Ventas por Catálogo
                    </Text>
                </View>
                <View style={styles.containerInputs}>
                    <View style={styles.innerContainer}>
                        <View style={styles.spacer} />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={correo => this.setState({correo})}
                            value={this.state.correo}
                            placeholder={'Correo'}
                            placeholderTextColor={'#999999'}
                            onSubmitEditing={() => {this.tb_contrasena.focus()}}
                            keyboardType={'email-address'}
                            returnKeyType={'next'}
                        />
                        <View style={styles.spacer} />
                    </View>
                    <View style={styles.innerContainer}>
                        <View style={styles.spacer} />
                        <TextInput
                            style={[styles.textInput, {fontFamily: 'monospace'}]}
                            onChangeText={(contrasena) => this.setState({contrasena})}
                            value={this.state.contrasena}
                            secureTextEntry={true}
                            placeholder={'Contraseña'}
                            placeholderTextColor={'#999999'}
                            ref={input => {this.tb_contrasena = input}}
                            onSubmitEditing={ () => { this.iniciar() } }
                            returnKeyType={'done'}
                        />
                        <View style={styles.spacer} />
                    </View>
                    <View style={styles.innerContainer}>
                        <View style={styles.spacer} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => {this.iniciar()}} style={styles.button}>
                                <Text style={styles.textButton}>
                                    Iniciar Sesión
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spacer} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerInputs: {
        flex: 1,
        alignItems: 'center'
    },
    innerContainer: {
        marginVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    title: {
        fontSize: 26,
        marginBottom: 25,
        marginTop: 40
    },
    spacer: {
        flex: 0.1
    },
    textInput: {
        flex: 0.8,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16
    },
    buttonContainer: {
        flex: 0.8,
        marginVertical: 15
    },
    button: {
        backgroundColor: Color.primary,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        color: Color.white,
        marginVertical: 10,
        fontSize: 15
    }
})