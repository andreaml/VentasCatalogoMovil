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
                                    <Text style={styles.descripcion} numberOfLines={1}>{descripcion}</Text>
                                    <Text style={styles.precio}>${precio}</Text>
                                    <View style={styles.carritoSpacer} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ position: 'absolute', left: 30, bottom: 20, zIndex: 2 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'black', padding: 3, paddingHorizontal: 8, borderRadius: 2 }}
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
        flex: 1,
        backgroundColor: '#00000033',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '42%',
        paddingTop: 2,
        paddingHorizontal: 10
    },
    producto: {
        flex: 1,
        fontSize: 24,
        color: 'white'
    },
    descripcion: {
        flex: 1,
        fontSize: 16,
        lineHeight: 30,
        color: 'white'
    },
    precio: {
        flex: 1,
        fontSize: 16,
        color: 'white'
    },
    carritoSpacer: {
        flex: 1,
    },
    carrito: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingHorizontal: 2
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