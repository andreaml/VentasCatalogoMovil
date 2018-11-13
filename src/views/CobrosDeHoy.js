import React from 'react';
import {View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import BackHandledComponent from '../components/BackHandledComponent';
import ListItem_CobrosDeHoy from '../components/ListItem_CobrosDeHoy'
import FooterView from '../components/FooterView'
import Colors from '../assets/Colors';
import {Actions} from 'react-native-router-flux';

export default class CobrosDeHoy extends BackHandledComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: [    {
                idCliente: "1",
                telefono: "3121196780",
                idPedido: "5236",
                hora: "13:30",
                total: "2000",
            },],
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
                        <TouchableOpacity onPress={() => console.warn("presionado: " + item.idCliente)}>
                            <ListItem_CobrosDeHoy style={{flex: 1}} {...item} />
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
                                    idCliente: "1",
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

var data = [
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "1",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
    },
    {
        idCliente: "100000000000",
        telefono: "3121196780",
        idPedido: "5236",
        hora: "13:30",
        total: "2000",
        color: true
    },
];