import React, { Component } from 'react';
import { Scene } from 'react-native-router-flux';
import RegistroView from '../views/Registro'

const RegistroRouter = () => {
    return (
        <Scene key='registro' type={"reset"} component={RegistroView} hideNavBar/>
    )
}

export default RegistroRouter();