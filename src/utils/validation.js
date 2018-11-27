const validation = {
  email: {
    presence: {
      allowEmpty: false,
      message: '^Ingrese un correo electrónico',
    },
    email: {
      message: '^Ingrese un correo electrónico válido',
    },
  },

  password: {
    presence: {
      allowEmpty: false,
      message: '^Ingrese una contraseña',
    },
    format: {
      pattern: '.*(?=.*?[0-9])(?=.*?[a-z]).*',
      message: "^Ingrese al menos una letra y un número"
    },
    length: {
      minimum: 6,
      message: '^Ingrese al menos 6 caracteres',
    }
  },

  userData: {
    presence: {
      allowEmpty: true
    },
    format: {
      pattern: /^([a-zA-ZÀ-ÿñÑ\s])*$/,
      flags: 'g',
      message: '^Ingrese sólo letras y espacios'
    },
    length: {
      minimum: 0,
      maximum: 30,
      tooLong: '^Ingrese máximo 30 letras',
    },
  },

  userDataRequired: {
    presence: {
      allowEmpty: false,
      message: '^Este campo es obligatorio'
    },
    length: {
      minimum: 3,
      maximum: 30,
      tooShort: '^Ingrese al menos 3 letras',
      tooLong: '^Ingrese máximo 30 letras',
    },
    format: {
      pattern: /^([a-zA-ZÀ-ÿñÑ\s]){3,}$/,
      flags: 'g',
      message: '^Ingrese sólo letras y espacios'
    },
  },

  price: {
    presence: {
      allowEmpty: false,
      message:'^Este campo es obligatorio'
    },
    format: {
      pattern: /^[+-]?([0-9]*[.])?[0-9]+$/,
      flags: 'g',
      message: '^Ingrese una cantidad válida'
    }
  },

  notEmpty: {
    presence: {
      allowEmpty: false,
      message: '^Este campo es obligatorio'
    }
  }
}
  
export default validation