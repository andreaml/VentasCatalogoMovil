import { AsyncStorage } from "react-native";

/**
 * Clase para manejo de carrito de manera global mediante el AsyncStorage
 * @class
 */
export default class Carrito {
  /**
   * @function vaciar
   * @access public
   * @description Se setea variable carrito del AsyncStorage como array vacío.
   */
  vaciar = () => {
    AsyncStorage.setItem('carrito', JSON.stringify([]), () => {
      this.obtenerProductos().then((items) => console.log(items))
    });
  }

  /**
   * @function vaciar
   * @access public
   * @description Se obtiene variable carrito del AsyncStorage.
   * @returns {Promise} Promesa con array de productos contenidos en variable carrito del AsyncStorage.
   */
  obtenerProductos = () => {
    return new Promise((res) => {
      AsyncStorage.getItem('carrito', (err, productos) => {
        //Se convierte string a objeto (en este caso devuelve un array de objetos)
        res(JSON.parse(productos));
      });
    })
  }

  /**
   * @function obtenerProducto
   * @access public
   * @param {number} idProducto - Id del producto que se desea obtener
   * @description Se filtra array de productos para obtener producto buscado por id.
   * @returns {Promise} Promesa con objeto de producto buscado o booleano false cuando no se encuentra.
   */
  obtenerProducto = (idProducto) => {
    return new Promise((res, rej) => {
      this.obtenerProductos().then((productos) =>{
        const productoBuscado = productos.filter(({id}) => {
          return id == idProducto
        })[0];
        if (productoBuscado) 
          res(productoBuscado);
        else
          rej(false);
      })
    });
  }

  /**
   * @function agregarProducto
   * @access public
   * @param {Object} producto - Objeto de producto para agregar al carrito
   * @param {number} [cantidad] - Cantidad de producto a agregar
   * @description Se agrega propiedad 'cantidad' a objeto de producto. Se verifica si existen productos en carrito para inicializar array o agregarlo al array existente.
   */
  agregarProducto = (producto, cantidad = 1) => {
    return new Promise((res, rej) => {
      const nuevoProducto = {...producto, cantidad};
      this.obtenerProductos().then((productos) => {
        if (productos && productos.length) {
          this._agregarProducto(productos, nuevoProducto).then(() => {
            res('El producto se agregó al carrito');
          })
          .catch(() => {
            rej('El producto no se pudo agregar al carrito');
          });
        } else {
          this._agregarPrimerProducto(nuevoProducto).then(() => {
            res('El producto se agregó al carrito');
          })
          .catch(() => {
            rej('El producto no se pudo agregar al carrito');
          });
        }
      })
    })
  }

  /**
   * @function _agregarProducto
   * @access private
   * @param {Array} productos - Array de productos del carrito
   * @param {Object} nuevoProducto - Objeto de producto para agregar al carrito
   * @description Se filtra array de productos para excluir producto con id del nuevoProducto y evitar productos repetidos. 
   * Se crea array nuevo concatenando el nuevoProducto con el array de productos y se convierte a string para agregarlo al AsyncStorage.
   */
  _agregarProducto = (productos, nuevoProducto) => {
    return new Promise((res, rej) => {
      const productosLimpio = productos.filter(({id}) => id != nuevoProducto.id);
      const nuevoProductos = [...productosLimpio, nuevoProducto];
      AsyncStorage.setItem('carrito', JSON.stringify(nuevoProductos), (err) => {
        if (err)
        rej();
        else {
          //{{BORRAR línea siguiente}}
          this.obtenerProductos().then((items) => console.log(items))
          res();
        }
      });
    })
  }

  /**
   * @function _agregarPrimerProducto
   * @access private
   * @param {Object} nuevoProducto - Objeto de producto para agregar al carrito
   * @description Se crea array de productos con nuevoProducto y se convierte a string para agregarlo al AsyncStorage.
   */
  _agregarPrimerProducto = (nuevoProducto) => {
    return new Promise((res, rej) => {
      const nuevoProductos = [nuevoProducto];
      AsyncStorage.setItem('carrito', JSON.stringify(nuevoProductos), (err) => {
        if (err)
          rej();
        else {
          //{{BORRAR línea siguiente}}
          this.obtenerProducto(12).then((producto)=>{});
          res();
        }
      });
    });
  }
}