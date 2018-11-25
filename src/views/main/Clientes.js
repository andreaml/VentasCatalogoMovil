import React from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import BackHandledComponent from '../../components/BackHandledComponent';
import ListItem_Clientes from '../../components/ListItem_Clientes';
import Colors from '../../assets/Colors';

export default class Clientes extends BackHandledComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [{
        id: 0,
        idUsuario: 0,
        nombre: "Andrea",
        apPaterno: "Muñoz",
        apMaterno: "Liy",
        correo: "andreamunozliy@gmail.com",
        telefono: "3121027157",
        domicilio: {
          estado: "Colima",
          municipio: "Colima",
          cp: "28017",
          colonia: "Santa Bárbara",
          calle: "Av. de La Paz",
          noExterno: "40",
          noInterno: "201",
          referencia: ""
        }
      }, ],
      threshold: 0.5,
      loading: true,
      refreshing: false
    }
  }

  handleOnEndReached = (distanceFromEnd) => {
    if (this.state.page < 5) {
      this.setState({
        page: this.state.page + 1,
        data: [...this.state.data, ...data]
      });
    } else {
      this.setState({
        loading: false
      }, () => {
        console.log("Final alcanzado");
      })
    }
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: 5}}>
        <FlatList
          ref={list => this.list = list}
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => console.warn("presionado: " + item.id)}>
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
              this.setState({
                page: 1,
                data: [    {
                  id: "1",
                  telefono: "3121196780",
                  idPedido: "5236",
                  hora: "13:30",
                  total: "2000",
                },],
                threshold: 0.5,
                loading: true,
                refreshing: false
              })
            })
          }}
          refreshing={this.state.refreshing}
        />
      </View>
    )
  }
}

var data = [{
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 1,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 2,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 3,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: ""
    }
  },
  {
    id: 0,
    idUsuario: 0,
    nombre: "Andrea",
    apPaterno: "Muñoz",
    apMaterno: "Liy",
    correo: "andreamunozliy@gmail.com",
    telefono: "3121027157",
    domicilio: {
      estado: "Colima",
      municipio: "Colima",
      cp: "28017",
      colonia: "Santa Bárbara",
      calle: "Av. de La Paz",
      noExterno: "40",
      noInterno: "201",
      referencia: "Al lado de un oxxo :v"
    },
    color: true
  },
];