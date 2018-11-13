import React, { Component } from 'react';
import { Scene } from 'react-native-router-flux';
import CobrosDeHoyView from '../views/CobrosDeHoy'

const EjemploRouter = () => {
    return (
        <Scene key='sintabs' component={CobrosDeHoyView} title='Cobros de hoy sin tabs'/>
    )
}

export default EjemploRouter();
