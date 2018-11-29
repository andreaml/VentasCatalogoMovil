import React, { Component } from 'react';
import { Scene } from 'react-native-router-flux';

// Imports de routers
import SplashRouter from './SplashRouter'
import LoginRouter from './LoginRouter'
import RegistroRouter from './RegistroRouter'
import MainRouter from './MainRouter'
import EjemploRouter from './EjemploRouter'
import { ClientesAgregar, ClientesDetalle, ClientesEditar } from './ClientesRouter'
import { ProductosDetalle, ProductosAgregar, ProductosModificar } from './ProductosRouter'
import CarritoVenta from './CarritoRouter'

const Router = () => {
    return (
        <Scene key='root'>
            {SplashRouter}
            {LoginRouter}
            {RegistroRouter}
            {MainRouter}
            {EjemploRouter}
            {ClientesAgregar}
            {ClientesDetalle}
            {ClientesEditar}
            {ProductosDetalle}
            {ProductosAgregar}
            {ProductosModificar}
            {CarritoVenta}
        </Scene>
    )
}

export default Router();