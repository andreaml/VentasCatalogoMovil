import React, { Component } from 'react';
import {BackHandler} from 'react-native';
import {Actions} from 'react-native-router-flux';

class BackHandledComponent extends Component {

    componentDidMount() {
        this.handleBackPress = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.handleBackPress.remove(); 
    }

    handleBackPress = () => {
        Actions.pop();
    }
}

export default BackHandledComponent;
