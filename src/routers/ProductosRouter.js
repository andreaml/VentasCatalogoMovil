import React, { Component } from 'react';
import { Scene } from 'react-native-router-flux';
import productosDetalle from '../views/main/productos/ProductosDetalle'
import productosEditar from '../views/main/productos/ProductosEditar'
// import clientesDetalle from '../views/main/clientes/ClientesDetalle'

// const _productosAgregar = () => {
//   return (
//     <Scene key='clientesAgregar' component={clientesAgregar} title='Agregar cliente'/>
//   )
// }

const _productosEditar = () => {
  return (
    <Scene key='productosEditar' component={productosEditar} title='Editar producto'/>
  )
}

const _productosDetalle = () => {
  return (
    <Scene key='productosDetalle' component={productosDetalle} title='Detalles producto' hideNavBar/>
  )
}

// export const ClientesAgregar  = _clientesAgregar();
export const ProductosEditar   = _productosEditar();
export const ProductosDetalle  = _productosDetalle();