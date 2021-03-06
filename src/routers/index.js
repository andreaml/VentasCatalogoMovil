import React, { Component } from 'react';
import { Scene } from 'react-native-router-flux';

// Imports de routers
import SplashRouter from './SplashRouter'
import LoginRouter from './LoginRouter'
import MainRouter from './MainRouter'
import EjemploRouter from './EjemploRouter'

const Router = () => {
    return (
        <Scene key='root'>
            {SplashRouter}
            {LoginRouter}
            {MainRouter}
            {EjemploRouter}
        </Scene>
    )
}

export default Router();