import Axios from 'axios'
import {URL, SESION, REGISTRO, PRODUCTOS, CLIENTES} from './Constantes'

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

export const GET_Clientes = (page, perPage) => {
    return new Promise((resolve, reject) => {
        Axios.get(`${CLIENTES}?page=${page}&perPage=${perPage}`).then((response) => {
            resolve(response.data)
        }).catch(err => {
            console.log(err)
            reject(err.response)
        })
    })
}

export const POST_Clientes = (cliente) => {
    return new Promise((resolve, reject) => {
        Axios.get(`${CLIENTES}`, cliente).then((response) => {
            resolve(response.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}