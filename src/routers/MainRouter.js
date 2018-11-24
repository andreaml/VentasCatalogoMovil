import React, { Component } from 'react';
import {Text, Image, View, Button, BackHandler, AsyncStorage} from 'react-native';
import { Scene, Actions } from 'react-native-router-flux';
import {createMaterialBottomTabNavigator as CreateTabs} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../assets/Colors';

// Imports de vistas
import CobrosDeHoyView from '../views/main/CobrosDeHoy'
import Productos from '../views/main/Productos'


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
            backToExit: true,
            title: 'Cobros de hoy'
        }
    }
    
    componentDidMount() {
        this.refresh();
    }

    refresh = (title = 'Cobros de hoy', backToExit = true) => {
        this.setState({backToExit, title}, () => {
            Actions.refresh({title: this.state.title});
        })
    }

    TabBar = CreateTabs({
        Productos: {
            screen: Productos,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name='store' color='white' size={24}/>
                ),
                tabBarOnPress: ({defaultHandler}) => {
                    this.refresh('Productos', false);
                    defaultHandler();
                },
                tabBarColor: Colors.success,
            }
        },
        Clientes: {
            screen: Placeholder,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name='people' color='white' size={24}/>
                ),
                tabBarOnPress: ({defaultHandler}) => {
                    this.refresh('Clientes', false);
                    defaultHandler();
                },
                tabBarColor: Colors.info,
            }
        },
        Hoy: {
            screen: CobrosDeHoyView,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name='today' color='white' size={24}/>
                ),
                tabBarOnPress: ({defaultHandler}) => {
                    this.refresh('Cobros de hoy', true);
                    defaultHandler();
                },
                tabBarColor: Colors.primary,
            }
        },
        Ventas: {
            screen: Placeholder,
            navigationOptions: {
                tabBarIcon: () => (
                    <Icon name='attach-money' color='white' size={24}/>
                ),
                tabBarOnPress: ({defaultHandler}) => {
                    this.refresh('Ventas', false);
                    defaultHandler();
                },
                tabBarColor: Colors.warning,
            }
        },
        Carrito: {
            screen: Placeholder,
            navigationOptions: {
                // tabBarLabel: 'Carrito',
                tabBarIcon: () => (
                    <Icon name='shopping-cart' color='white' size={24}/>
                ),
                tabBarOnPress: ({defaultHandler}) => {
                    this.refresh('Carrito', false);
                    defaultHandler();
                },
                tabBarColor: Colors.danger,
            }
        }
    }, {
        initialRouteName: "Hoy",
    })

    componentDidMount() {
        // console.warn("Elemento Montado")
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove(); 
    }

    handleBackPress = () => {
        if (this.state.backToExit) {
            BackHandler.exitApp();
        } else {
            this.refresh('Cobros de hoy', true)
        }
    }

    render() {
        return (
            <View style={{flex: 1, elevation: 5}}>
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
