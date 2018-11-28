import React, { Component } from 'react';
import {Text, Image, View, Button, BackHandler, AsyncStorage} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import {createMaterialBottomTabNavigator as CreateTabs} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../assets/Colors';

// Imports de vistas
import ClientesView from '../views/main/Clientes'
import CobrosDeHoyView from '../views/main/CobrosDeHoy'
import ProductosView from '../views/main/Productos'


class Placeholder extends Component {
    render() {
      return (
          <View>
              <Text>Placeholder Shidoliro</Text>
              <Button title="sin tabs" onPress={
                  () => {
                      Actions.sintabs()
                      AsyncStorage.removeItem("Token");
                    }
              }/>
          </View>
      )
    }
}

class BottomNavigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updates: {
                productos: 123, // Controla eliminados y modificados
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.updates) { // Si hay algo que actualizar
            switch (nextProps.updates.accion) {
                // ------ Producto
                case 'AgregarProducto': 
                    this.productos.AgregarElemento(nextProps.updates.valor)
                    break
                case 'ModificarProducto': 
                    this.productos.ModificarElemento(nextProps.updates.valor)
                    break
                case 'EliminarProducto': 
                    this.productos.EliminarElemento(nextProps.updates.valor)
                    break
                // ------ Clientes
                case 'AgregarCliente': 
                    // this.productos.AgregarElemento(nextProps.updates.productos.agregar)
                    break
                case 'ModificarCliente': 
                    // this.productos.ModificarElemento(nextProps.updates.productos.add)
                    break
                case 'EliminarCliente': 
                    // this.productos.EliminarElemento(nextProps.updates.productos.eliminar)
                    break
            }
            Actions.refresh({updates: null});
        }
    }

    TabBar = CreateTabs({
        Productos: {
            screen: () => <ProductosView ref={productos => this.productos = productos} />,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name='store' color='white' size={24}/>
                ),
                tabBarColor: Colors.success,                
            },
        },
        Clientes: {
            screen: ClientesView,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name='people' color='white' size={24}/>
                ),
                tabBarColor: Colors.info,
            }
        },
        Hoy: {
            screen: CobrosDeHoyView,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name='today' color='white' size={24}/>
                ),
                tabBarColor: Colors.primary,
            }
        },
        Ventas: {
            screen: Placeholder,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name='attach-money' color='white' size={24}/>
                ),
                tabBarColor: Colors.warning,
            }
        },
        Carrito: {
            screen: Placeholder,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name='shopping-cart' color='white' size={24}/>
                ),
                tabBarColor: Colors.danger,
            }
        }
    }, {
        initialRouteName: "Hoy",
        backBehavior: 'none'
    })

    render() {
        return (
            <View style={{flex: 1}}>
                <this.TabBar/>
            </View>
        )
    }
}

const MainRouter = () => {
    return (
        <Scene type="reset" key='main' component={BottomNavigation} title="Ventas por catálogo"/>
    )
}

export default MainRouter();
