import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import Colors from '../../../assets/Colors'
import {DELETE_Productos as deleteProducto} from '../../../api'

/**
 * @typedef Props
 */
type Props = {
    /** 
     * Id del producto
     */
    id: number,

    /** 
     * Nombre del producto
     */
    nombre: string,

    /** 
     * Descripcion del producto
     */
    descripcion: string,

    /** 
     * Precio del producto
     */
    precio: number,

    /** 
     * Imagen del producto
     */
    imagen?: string
}

class ProductosDetalle extends Component<Props> {
    constructor(props) {
        super(props);
    }

    /**
     * @function handleOnEditPress
     * @access private
     * @description Maneja el evento de presionar el botón editar
     */
    handleOnEditPress = () => {
        const { id, nombre, descripcion, precio, imagen } = this.props;
        Actions.productosModificar({ id, nombre, descripcion, precio, imagen });
    }

    /**
     * @function handleOnDeletePress
     * @access private
     * @description Maneja el evento de presionar el botón eliminar
     */
    handleOnDeletePress = () => {
        Alert.alert(
            'Eliminar Producto',
            '¿Está seguro de eliminar este producto? Esta acción no se puede deshacer',
            [
                {text: 'Cancelar', style: 'cancel'},
                {text: 'Eliminar', style: 'destructive', onPress: this.deleteProducto}
            ],
            { cancelable: false }
        )
    }

    /**
     * @function deleteProducto
     * @access private
     * @description Envía la solicitud al servidor de eliminar un producto, después cierra la vista
     */
    deleteProducto = () => {
        deleteProducto(this.props.id).then(() => {
            Actions.pop({
                refresh: {
                    updates: {
                        accion: 'EliminarProducto',
                        valor: this.props.id
                    }
                }
            });
        }).catch(err => console.log(err));
    }

    /**
     * @function renderContent
     * @access private
     * @description Renderiza el contenido de la vista.
     */
    renderContent = () => (
        <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 15, paddingBottom: 15, minHeight: Dimensions.get('screen').height}}>
            <Text style={{fontSize: 28}}>{this.props.nombre || "Nombre del producto"}</Text>
            <Text> {this.props.descripcion || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum, ligula id tincidunt rhoncus, ex purus dignissim ligula, eu laoreet tellus velit non est. In et tincidunt lectus. Etiam sed ligula ligula. Sed sed hendrerit nibh. Morbi ac massa id elit rutrum scelerisque in id neque. Suspendisse sed lectus nisl. Proin accumsan ante leo, dictum semper metus aliquet non. Sed mi arcu, placerat eget ornare non, dignissim et lorem. Vestibulum tincidunt egestas erat a pharetra. Aliquam gravida nunc nec dapibus interdum."}
            </Text>
            <Text style={{marginTop: 25, fontSize: 24}}>Precio: ${parseFloat(this.props.precio) || "500.00"}</Text>
            <View style={{flexDirection: 'row', width: '100%', height: 60, marginTop: 20}}>
                <TouchableOpacity style={styles.botonContainer} onPress={this.handleOnEditPress}>
                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='edit' color={Colors.secondary} size={24} />
                    </View>
                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: Colors.secondary}}> Editar </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonContainer} onPress={this.handleOnDeletePress}>
                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='delete' color={Colors.danger} size={24} />
                    </View>
                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: Colors.danger}}> Eliminar </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

    /**
     * @function renderNavBar
     * @access private
     * @description Renderiza la cabecera de la vista.
     */
    renderNavBar = () => (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={{padding: 12.5}} onPress={() => Actions.pop()}>
                <Icon name='arrow-back' size={24} color='white' />
            </TouchableOpacity>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    Ver producto
                </Text>
            </View>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <ReactNativeParallaxHeader
                headerMinHeight={50}
                headerMaxHeight={Dimensions.get('screen').width}
                extraScrollHeight={50}
                navbarColor={Colors.success}
                titleStyle={0}
                backgroundImage={{uri: this.props.imagen || 'https://via.placeholder.com/2000x3000?text=Placeholder'}}
                backgroundImageScale={1.2}
                renderNavBar={this.renderNavBar}
                renderContent={this.renderContent}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleStyle: {
        color: 'black'
    },
    botonContainer: {
        flex: 1,
        marginHorizontal: 5,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 3,
        flexDirection: 'column'
    },
})

/**
 * @exports ProductosDetalle
 */
export default ProductosDetalle;
