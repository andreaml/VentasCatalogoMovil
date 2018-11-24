import React, {Component} from 'react';
import ReactNative, {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, AsyncStorage, BackHandler} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Color from '../assets/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackHandledComponent from '../components/BackHandledComponent';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {iniciarSesion} from '../api/apiClient';
import Axios from 'axios';

export default class Registro extends Component {
    state = {
        correo: '',
        nombre: '',
        apPaterno: '',
        apMaterno: '',
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
        const {nombre, apPaterno, apMaterno, correo, contrasena} = this.state;
    }

    _scrollToInput = (reactNode) => {
        // Add a 'scroll' ref to your ScrollView
        console.log(reactNode)
        this.scroll.props.scrollToPosition(0, 0)
          }

    render() {
        return (
            <KeyboardAwareScrollView 
            style={{flex: 1}}
            contentContainerStyle={styles.container}
            >
                <View>
                    <Text style={styles.title}>
                        Registro
                    </Text>
                </View>
                <TextInput
                    autoCapitalize={'words'}
                    style={[styles.textInput]}
                    onChangeText={(nombre) => this.setState({nombre})}
                    value={this.state.nombre}
                    placeholder={'Nombre(s)'}
                    placeholderTextColor={'#999999'}
                    ref={input => {this.tb_nombre = input}}
                    onSubmitEditing={ () => { this.tb_apPaterno.focus() } }
                    returnKeyType={'next'}
                />
                <TextInput
                    autoCapitalize={'words'}
                    style={[styles.textInput]}
                    onChangeText={(apPaterno) => this.setState({apPaterno})}
                    value={this.state.apPaterno}
                    placeholder={'Apellido paterno'}
                    placeholderTextColor={'#999999'}
                    ref={input => {this.tb_apPaterno = input}}
                    onSubmitEditing={ () => { this.tb_apMaterno.focus() } }
                    returnKeyType={'next'}
                />
                <TextInput
                    autoCapitalize={'words'}
                    style={[styles.textInput]}
                    onChangeText={(apMaterno) => this.setState({apMaterno})}
                    value={this.state.apMaterno}
                    placeholder={'Apellido materno'}
                    placeholderTextColor={'#999999'}
                    ref={input => {this.tb_apMaterno = input}}
                    onSubmitEditing={ () => { this.tb_correo.focus() } }
                    returnKeyType={'next'}
                />
                <TextInput
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    style={[styles.textInput]}
                    onChangeText={(correo) => this.setState({correo})}
                    value={this.state.correo}
                    placeholder={'Correo'}
                    placeholderTextColor={'#999999'}
                    ref={input => {this.tb_correo = input}}
                    onSubmitEditing={ () => { this.tb_contrasena.focus() } }
                    returnKeyType={'next'}
                />
                <TextInput
                    autoCapitalize={'none'}
                    style={[styles.textInput]}
                    onChangeText={(contrasena) => this.setState({contrasena})}
                    value={this.state.contrasena}
                    secureTextEntry={true}
                    placeholder={'Contraseña'}
                    placeholderTextColor={'#999999'}
                    ref={input => {this.tb_contrasena = input}}
                    onSubmitEditing={ () => { this.iniciar() } }
                    returnKeyType={'done'}
                />
                <TouchableOpacity onPress={() => {this.iniciar()}} style={styles.button}>
                    <Text style={styles.textButton}>
                        Registrarme
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
        marginTop: 20
    },
    textInput: {
        width: '80%',
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    button: {
        width: '80%',
        backgroundColor: Color.primary,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    textButton: {
        color: Color.white,
        marginVertical: 10,
        fontSize: 15
    }
})