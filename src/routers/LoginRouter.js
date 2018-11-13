import React, { Component } from 'react';
import { Scene } from 'react-native-router-flux';
import LoginView from '../views/Login'

const LoginRouter = () => {
    return (
        <Scene key='login' type={"reset"} component={LoginView} hideNavBar/>
    )
}

export default LoginRouter();
