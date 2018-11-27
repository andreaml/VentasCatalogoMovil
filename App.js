/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 // Imports de sistemas
import React, { Component } from 'react';
import { Router } from 'react-native-router-flux';

// Imports de Axios
import Axios from 'axios'
import { URL_API } from './src/api/Constantes'

// Imports de rutas
import Scenes from './src/routers'

// Configuración de Axios
Axios.defaults.baseURL = URL_API;
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.put['Content-Type'] = 'application/json';

export default class App extends Component {
  render() {
    return (
      <Router>
        {Scenes}
      </Router>
    );
  }
}

