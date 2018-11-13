import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    idCliente: string,
    telefono: string,
    idPedido: string,
    hora: string,
    total: number,
    color?: boolean
}

export default class ListItem_CobrosDeHoy extends PureComponent<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        const {idCliente, telefono, idPedido, hora, total, color} = this.props
        return (
            <View style={[styles.root, { backgroundColor: color ? 'gold' : 'white' }]}>
                <View>
                    <Text style={styles.textCliente}>
                        Cliente {idCliente}
                    </Text>
                    <Text>
                        {telefono}
                    </Text>
                    <Text style={styles.textCliente}>
                        Pedido: #{idPedido}
                    </Text>
                </View>
                <View>
                    <Text style={styles.textHora}>
                        {hora} hrs
                    </Text>
                    <Text style={styles.textHora}>
                        ${total}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        marginVertical: 2,
        marginHorizontal: 5,
        elevation: 1
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