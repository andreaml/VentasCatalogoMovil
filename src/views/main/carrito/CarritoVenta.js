import React, { Component } from 'react';
import { Alert, View, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import ListItem_Clientes from '../../../components/ListItem_Clientes';
import Colors from '../../../assets/Colors';
import { GET_Clientes as getClientes, POST_Ventas as postVentas } from '../../../api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';
import CarritoHandler from '../../../utils/CarritoHandler';

/**
 * Vista para mostrar lista de clientes
 * @class
 */
export default class CarritoVenta extends Component {
  constructor(props) {
		super(props);
		this.carritoHandler = new CarritoHandler();
    this.state = {
      page: 1,
      perPage: 10,
      clientes: [],
      threshold: 0.5,
      loading: true,
      refreshing: false
    }
  }

  componentDidMount() {
    this.handleOnRefresh();
  }

  /** @function handleOnRefresh
   * @access private
   * @description Se manda a llamar cuando se refresca la vista o se carga por primera vez. Restablece el state a configuración inicial. Ejecuta función de petición GET para obtener clientes paginados.
   */
  handleOnRefresh = () => {
    getClientes(1, this.state.perPage).then(result => {
      this.setState({
        refreshing: true
      }, () => {
        this.setState({
          page: 1,
          clientes: result.items,
          pages: parseInt(result.total / this.state.perPage) + 1,
          threshold: 0.5,
          loading: true,
          refreshing: false
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  /** @function handleOnEndReached
   * @access private
   * @description Se manda a llamar cuando al hacer scroll hacia abajo se alcanza el fin de la vista. Modifica el state para aumentar la paginación. Ejecuta función de petición GET para obtener clientes paginados.
   */
  handleOnEndReached = (distanceFromEnd) => {
    if (this.state.page < this.state.pages) {
      getClientes(this.state.page + 1, this.state.perPage).then(result => {
        this.setState({
          page: this.state.page + 1,
          clientes: [...this.state.clientes, ...result.items]
        });
      }).catch(err => {
        console.log(err);
      })
    } else {
      this.setState({
        loading: false
      }, () => {
        console.log("Final alcanzado");
      })
    }
	}
	
	finalizarVenta = (idCliente) => {
		this.carritoHandler.obtenerProductos().then(productos => {
			const productosLimpios = productos.map(({id, cantidad}) => {
				return {idProducto: id, cantidad}
			});
			console.log(productosLimpios)
			const venta = {
				idCliente,
				pago: {
					tipo: 'Contado'
				},
				productos: productosLimpios
			}
			Alert.alert(
				'Finalizar venta',
				'¿Está seguro de finalizar la venta?',
				[
					{text: 'Cancelar', style: 'cancel'},
					{
						text: 'Sí',
						onPress: () => this._finalizarVenta(venta)
					},
				],
				{ cancelable: false }
			);
		}).catch(()=>{});
	}

	_finalizarVenta = (venta) => {
		postVentas(venta).then((data) => {
      Alert.alert('','Venta realizada con éxito',
        [
          {
						text: 'Ok', onPress: () => {
							this.carritoHandler.vaciar(() => {
							}).catch(()=>{});
							Actions.pop();
							this.props.refreshVistaCarrito();
						}
          } 
        ],
        { cancelable: false }
      );
    }).catch(response => {
      if (response.status == 400) {
        Alert.alert('Error en la venta', 'Verifique los datos ingresados', [{
            text: 'Ok'
          }], {
            cancelable: false
        });
      } else {
        Alert.alert('Error en la venta', 'No se puede terminar la venta en este momento, inténtelo mas tarde', [{
            text: 'Ok'
          }], {
            cancelable: false
        });
      }
    });
	}

  render() {
    return (
      <View style={{flex: 1, marginTop: 5}}>
        <FlatList
          ref={list => this.list = list}
          data={this.state.clientes}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {
							this.finalizarVenta(item.id);
						}
						}>
              <ListItem_Clientes style={{flex: 1}} {...item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={(distanceFromEnd) => this.handleOnEndReached(distanceFromEnd)}
          onEndReachedThreshold={this.state.threshold}
          ListFooterComponent={
            this.state.loading ? 
            <ActivityIndicator
              style={{margin: 10}}
              size={"small"}
              color={Colors.secondary}
            /> : null
          }
          onRefresh={() => {
            this.setState({
              refreshing: true
            }, () => {
              this.handleOnRefresh();
            })
          }}
          refreshing={this.state.refreshing}
        />
        <ActionButton 
          buttonColor={Colors.clientes}
          onPress={() => { Actions.clientesAgregar() }}
        >
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    borderColor: 'black',
    elevation: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 2,
  },
  containerCliente: {
    padding: 20,
    width: '90%',
  },
  textCliente: {
    fontSize: 16
  },
  containerIcono: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '10%',
  }
});