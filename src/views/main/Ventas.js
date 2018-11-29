import React from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import BackHandledComponent from '../../components/BackHandledComponent';
import ListItem_Ventas from '../../components/ListItem_Ventas';
import Colors from '../../assets/Colors';
import { GET_Ventas as getVentas } from '../../api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';

export default class Ventas extends BackHandledComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPage: 10,
      ventas: [],
      threshold: 0.5,
      loading: true,
      refreshing: false
    }
  }

  componentDidMount() {
    this.handleOnRefresh();
  }

  handleOnRefresh = () => {
    getVentas(1, this.state.perPage).then(result => {
      this.setState({
        refreshing: true
      }, () => {
        this.setState({
          page: 1,
          ventas: result.items,
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
      getVentas(this.state.page + 1, this.state.perPage).then(result => {
        this.setState({
          page: this.state.page + 1,
          ventas: [...this.state.ventas, ...result.items]
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
          data={this.state.ventas}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {Actions.ventasDetalle({venta: item})}}>
              <ListItem_Ventas style={{flex: 1}} {...item} />
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
          buttonColor={Colors.info}
          onPress={() => { Actions.ventasAgregar() }}
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