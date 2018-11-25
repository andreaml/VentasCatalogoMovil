import Axios from 'axios'
import {URL, SESION, REGISTRO, PRODUCTOS} from './Constantes'

export const iniciarSesion = (correo, contrasena) => {
  return new Promise((resolve, reject) => {
    Axios.post(SESION, {
        correo, contrasena
    }).then((response) => {
        resolve(response.data)
    }).catch(err => {
        reject(err.response)
    })
  })
}

export const registrarUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    Axios.post(REGISTRO, usuario).then((response) => {
        resolve(response.data)
    }).catch(err => {
        reject(err.response)
    })
  })
}

export const GET_Productos = (page, perPage) => {
    return new Promise((resolve, reject) => {
        Axios.get(`${PRODUCTOS}?page=${page}&perPage=${perPage}`).then((response) => {
            resolve(response.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}