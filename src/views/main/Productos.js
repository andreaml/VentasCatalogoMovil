import React from 'react';
import {View, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import BackHandledComponent from '../../components/BackHandledComponent';
import ListItem_Productos from '../../components/ListItem_Productos'
import Colors from '../../assets/Colors';
import ActionButton from 'react-native-action-button';
import {GET_Productos as getProductos} from '../../api'
import { Actions } from 'react-native-router-flux'

export default class Productos extends BackHandledComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pages: 0,
            data: [],
            threshold: 0.5,
            loading: true,
            refreshing: false
        }
    }

    componentDidMount() {
        this.handleOnRefresh();
    }

    AgregarElemento(newItem) {
        this.setState({
            data: [
                ...this.state.data,
                newItem
            ]
        })
    }

    EliminarElemento(id) {
        const arrayTemp = this.state.data;
        arrayTemp.find((element, index, array) => {
            if (element.id === id) {
                array.splice(index, 1);
                return true;
            }
        })
        this.setState({
            data: arrayTemp
        })
    }

    ModificarElemento(id, updatedItem) {
        const arrayTemp = this.state.data;
        arrayTemp.find((element, index, array) => {
            if (element.id === id) {
                array[index] = updatedItem;
                return true;
            }
        })
        this.setState({
            data: arrayTemp
        })
    }

    handleOnRefresh = () => {
        getProductos(1, 4).then(result => {
            this.setState({
                refreshing: true
            }, () => {
                this.setState({
                    page: 1,
                    data: result.items,
                    pages: parseInt(result.total / 4) + 1,
                    threshold: 0.5,
                    loading: true,
                    refreshing: false
                })
            })
        })
    }

    handleOnEndReached = (distanceFromEnd) => {
        if (this.state.page < this.state.pages) {
            getProductos(this.state.page + 1, 4).then(result => {
                console.log(result);
                this.setState({
                    page: this.state.page + 1,
                    data: [...this.state.data, ...result.items]
                });
            }).catch(err => {
                console.log(err);
            })
        } else {
            this.setState({
                loading: false
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
                        <ListItem_Productos style={{flex: 1}} {...item} />
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
                    onRefresh={() => this.handleOnRefresh()}
                    refreshing={this.state.refreshing}
                />
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { Actions.productosAgregar() }}
                />
            </View>
        )
    }
}