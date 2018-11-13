import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Keyboard} from 'react-native';
import Color from '../assets/Colors';

export default class FooterView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false
        }
    }
    
    componentDidMount() {
        this.handleKeyboardShown = Keyboard.addListener('keyboardDidShow', () => {
            this.setState({
                hidden: true
            })
        })
        this.handleKeyboardHidden = Keyboard.addListener('keyboardDidHide', () => {
            this.setState({
                hidden: false
            })
        })
    }

    componentWillUnmount() {
        this.handleKeyboardShown.remove();
        this.handleKeyboardHidden.remove();
    }

    getFooter() {
        return !this.state.hidden &&
        <View style={styles.footerContainer}>
            <Text>Lawea</Text>
        </View>
    }

    render() {
        return (
            <View {...this.props} style={[this.props.style, styles.root]}>
                <View style={styles.content}>
                    {this.props.children}
                </View>
                {this.getFooter()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    content: {
        flex: 0.92
    },
    footerContainer: {
        flexDirection: 'row',
        flex: 0.08,
        backgroundColor: Color.primary
    }
})