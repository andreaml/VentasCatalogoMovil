import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../../assets/Colors'
import ImagePicker from 'react-native-image-crop-picker'
import TextField from '../../../components/TextField'
import validate from '../../..//utils/validationWrapper';
import { Actions } from 'react-native-router-flux';
import { POST_Productos as AgregarProductoRequest } from '../../../api'

class ProductosEditar extends Component {

    state = {
        errores: {
            nombre: '',
            precio: '',
            descripcion: '',
            imagen: ''
        },
        producto: {
            nombre: '',
            precio: '',
            descripcion: '',
            imagen: ''
        }
    }


    _validarFormulario = () => {
        this.setState({
            errores: {
                nombre: validate('notEmpty', this.state.producto.nombre),
                precio: validate('price', this.state.producto.precio),
                descripcion: validate('notEmpty', this.state.producto.descripcion),
                imagen: validate('notEmpty', this.state.producto.imagen),
            }
        }, this._asignarValidezFormulario);
    }
    
    _asignarValidezFormulario = () => {
        const { errores } = this.state;
        let validezFormulario = true;
        for (const index in errores) {
            if (errores[index]) {
                validezFormulario = false;
                break;
            }
        }
        if (validezFormulario) {
            this.agregarProducto();
        } else {
            Alert.alert('Error en el registro','Verifique los datos ingresados, por favor.',
            [
                {text: 'Ok'},
            ],
                { cancelable: false }
            );
        }
    }

    agregarProducto = () => {
        console.log(this.state.producto);
        AgregarProductoRequest({
            ...this.state.producto,
            precio: parseFloat(this.state.producto.precio)
        }).then(response => {
            Actions.pop()
            setTimeout(() => Actions.refresh({
                updates: {
                    productos: {
                        add: {
                            ...this.state.producto,
                            imagen: `data:image/jpeg;base64,${this.state.producto.imagen}`
                        }
                    }
                }
            }), 0);
        }).catch(err => {
            console.log(err);
        })
    }

    onCameraButtonPress = () => {
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            console.log(image);
            this.setState({
                producto: {
                    ...this.state.producto,
                    imagen: image.data
                }
            });
        }).catch(err => console.log(err));
    }

    onGalleryButtonPress = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            console.log(image);
            this.setState({
                producto: {
                    ...this.state.producto,
                    imagen: image.data
                }
            });
        }).catch(err => console.log(err));
    }

    _renderImagePicker = () => (
        <View style={{flex: 0.5, marginTop: 20}}>
            <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Selecciona una imágen</Text>                    
            </View>
            <View style={{flex: 0.7, flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.onCameraButtonPress} style={[styles.iconoImagen, {width: '100%', aspectRatio: 1}]}>
                    <Icon name='photo-camera' color='black' size={50}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onGalleryButtonPress} style={[styles.iconoImagen, {width: '100%', aspectRatio: 1}]}>
                    <Icon name='image' color='black' size={50}/>
                </TouchableOpacity>
            </View>
        </View> 
    )

    _renderCurrentImage = () => (
        <View style={{flex: 0.5, marginTop: 20, flexDirection: 'row'}}>
            <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={{uri: this.state.producto.imagen ? `data:image/jpeg;base64,${this.state.producto.imagen}` : 'https://via.placeholder.com/2000x3000?text=Placeholder'}}
                    style={{width: '100%', aspectRatio: 1, borderRadius: 3}} 
                    resizeMode='cover'
                    resizeMethod='scale'/>
            </View>
            <View style={{flex: 0.3}}>
                <TouchableOpacity onPress={this.onCameraButtonPress} style={styles.iconoImagen}>
                    <Icon name='photo-camera' color='black' size={40}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onGalleryButtonPress} style={styles.iconoImagen}>
                    <Icon name='image' color='black' size={40}/>
                </TouchableOpacity>
            </View>
        </View>
    )

    render() {
        return (
            <KeyboardAwareScrollView
            style={styles.root}
            contentContainerStyle={styles.container}
            >
                <View style={styles.container}>
                    {this.state.producto.imagen ? this._renderCurrentImage() : this._renderImagePicker()}
                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                        <TextField
                            style={styles.textInput}
                            containerStyle={{width: '100%'}}
                            value={this.state.producto.nombre}
                            onChangeText={(nombre) => {
                                this.setState({
                                    producto: {
                                        ...this.state.producto,
                                        nombre
                                    }
                                })
                            }}
                            placeholder='Nombre del producto'
                            onSubmitEditing={() => {this.tb_precio.input.focus()}}
                            placeholderTextColor={'#999999'}
                            onBlur={() => {
                                this.setState({
                                    errors: {
                                        ...this.state.errores,
                                        precio: validate('notEmpty', this.state.producto.nombre),
                                    }
                                })
                            }}
                            error={this.state.errores.nombre}/>
                        <TextField
                            style={styles.textInput}
                            containerStyle={{width: '100%'}}
                            value={this.state.producto.precio}
                            onChangeText={(precio) => {
                                this.setState({
                                    producto: {
                                        ...this.state.producto,
                                        precio
                                    }
                                })
                            }}
                            keyboardType='number-pad'
                            ref={input => this.tb_precio = input}
                            onSubmitEditing={() => {this.tb_descripcion.input.focus()}}
                            placeholder='Precio - $0.00'
                            onBlur={() => {
                                this.setState({
                                    errors: {
                                        ...this.state.errores,
                                        precio: validate('price', this.state.producto.precio),
                                    }
                                })
                            }}
                            error={this.state.errores.precio}/>
                        <TextField
                            multiline
                            textAlignVertical={'top'}
                            style={[styles.textInput, {minHeight: 100}]}
                            containerStyle={{width: '100%'}}
                            value={this.state.producto.descripcion}
                            onChangeText={(descripcion) => {
                                this.setState({
                                    producto: {
                                        ...this.state.producto,
                                        descripcion
                                    }
                                })
                            }}
                            ref={input => this.tb_descripcion = input}
                            placeholder='Descripción'
                            placeholderTextColor={'#999999'}
                            onBlur={() => {
                                this.setState({
                                    errors: {
                                        ...this.state.errores,
                                        precio: validate('notEmpty', this.state.producto.descripcion),
                                    }
                                })
                            }}
                            error={this.state.errores.descripcion}/>
                        <TouchableOpacity style={styles.boton} onPress={this._validarFormulario}>
                            <Text style={{color: Colors.white, fontSize: 16}}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10
    },
    container: {
        // marginHorizontal: 10,
    },
    iconoImagen: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 3,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        marginVertical: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 18,
        paddingHorizontal: 10,
        paddingTop: 10,
        width: '100%',
    },
    boton: {
        width: '100%',
        backgroundColor: Colors.success,
        padding: 7.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5,
        elevation: 3,
    }
})

export default ProductosEditar;
