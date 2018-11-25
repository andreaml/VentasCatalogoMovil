import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

type Props = {
    id: number,
    nombre: string,
    descripcion: string,
    precio: number
}

export default class ListItem_Productos extends PureComponent<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        const { nombre, descripcion, precio } = this.props
        return (
            <View style={{flex: 1}}>
                <View>
                    <View style={{zIndex: 1}}>
                        <TouchableOpacity onPress={() => console.warn(`presionada tarjeta ${this.props.id}`)}>
                            <View style={styles.root}>
                                <Image style={styles.image} resizeMode={'cover'} resizeMethod={'scale'} source={{uri: 'https://via.placeholder.com/2000x3000?text=Placeholder'}}></Image>
                                <View style={styles.footer}>
                                    <Text style={styles.producto}>{nombre}</Text>
                                    <Text style={styles.descripcion}>{descripcion}</Text>
                                    <Text style={styles.precio}>${precio}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ position: 'absolute', left: 30, bottom: 20, zIndex: 2 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'black', padding: 3 }}
                        onPress={() => console.warn(`presionado boton ${this.props.id}`)}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}>
                            AGREGAR AL CARRITO
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        // flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        elevation: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    footer: {
        backgroundColor: '#00000033',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        paddingTop: 2,
        paddingLeft: 10
    },
    producto: {
        marginBottom: 5,
        fontSize: 24,
        color: 'white'
    },
    descripcion: {
        marginBottom: 5,
        fontSize: 16,
        color: 'white'
    },
    precio: {
        marginBottom: 10,
        fontSize: 16,
        color: 'white'
    },
    carrito: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCliente: {
        fontSize: 16
    }
});