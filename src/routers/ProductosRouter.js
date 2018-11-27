import React, { Component } from 'react';
import { Scene } from 'react-native-router-flux';
import productosDetalle from '../views/main/productos/ProductosDetalle'
import productosAgregar from '../views/main/productos/ProductosAgregar'
import productosModificar from '../views/main/productos/ProductosModificar'

const _productosAgregar = () => {
  return (
    <Scene key='productosAgregar' component={productosAgregar} title='Agregar producto'/>
  )
}

const _productosModificar = () => {
  return (
    <Scene key='productosModificar' component={productosModificar} title='Editar producto'/>
  )
}

const _productosDetalle = () => {
  return (
    <Scene key='productosDetalle' component={productosDetalle} title='Detalles producto' hideNavBar/>
  )
}

export const ProductosModificar = _productosModificar();
export const ProductosAgregar   = _productosAgregar();
export const ProductosDetalle   = _productosDetalle();