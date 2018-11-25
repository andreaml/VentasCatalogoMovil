import React from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import BackHandledComponent from '../../components/BackHandledComponent';
import ListItem_Clientes from '../../components/ListItem_Clientes';
import Colors from '../../assets/Colors';
import { GET_Clientes as getClientes } from '../../api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';

export default class Clientes extends BackHandledComponent {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <View style={{flex: 1, marginTop: 5}}>
        <FlatList
          ref={list => this.list = list}
          data={this.state.clientes}
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
              this.handleOnRefresh();
            })
          }}
          refreshing={this.state.refreshing}
        />
        <ActionButton 
          buttonColor="rgba(231,76,60,1)"
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