import React, { Component } from 'react';
import { Scene } from 'react-native-router-flux';
import clientesAgregar from '../views/main/clientes/ClientesAgregar'
import clientesEditar from '../views/main/clientes/ClientesEditar'
import clientesDetalle from '../views/main/clientes/ClientesDetalle'

const _clientesAgregar = () => {
  return (
    <Scene key='clientesAgregar' component={clientesAgregar} title='Agregar cliente'/>
  )
}

const _clientesEditar = () => {
  return (
    <Scene key='clientesEditar' component={clientesEditar} title='Editar cliente'/>
  )
}

const _clientesDetalle = () => {
  return (
    <Scene key='clientesDetalle' component={clientesDetalle} title='Detalles cliente'/>
  )
}

export const ClientesAgregar  = _clientesAgregar();
export const ClientesEditar   = _clientesEditar();
export const ClientesDetalle  = _clientesDetalle();