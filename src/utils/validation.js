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
    }
  },

  phone: {
    presence: {
      allowEmpty: false,
      message: '^Ingrese un número telefónico'
    },
    length: {
      minimum: 7,
      maximum: 15,
      tooShort: '^Ingrese al menos 7 números',
      tooLong: '^Ingrese máximo 15 números',
    },
    format: {
      pattern: /^([0-9\+]){7,15}$/,
      flags: 'g',
      message: '^Ingrese sólo números'
    }
  },

  addressNumber: {
    length: {
      minimum: 0,
      maximum: 6,
      tooLong: '^Ingrese máximo 6 números o letras',
    },
    format: {
      pattern: /^([a-zA-Z0-9\-\s])*$/,
      flags: 'g',
      message: '^Ingrese sólo números, letras y guiones'
    }  
  },

  addressName: {
    presence: {
      allowEmpty: false,
      message: '^Este campo es obligatorio'
    },
    length: {
      minimum: 3,
      maximum: 60,
      tooShort: '^Ingrese al menos 3 letras',
      tooLong: '^Ingrese máximo 60 letras',
    },
    format: {
      pattern: /^([0-9a-zA-ZÀ-ÿñÑ\s\.]){3,}$/,
      flags: 'g',
      message: '^Ingrese sólo letras, números, puntos y espacios'
    },
  },

  postalCode: {
    presence: {
      allowEmpty: false,
      message: '^Ingrese un código postal'
    },
    length: {
      is: 5,
      message: '^Un código postal tiene 5 números',
    },
    format: {
      pattern: /^[\d]{5}$/,
      flags: 'g',
      message: '^Ingrese sólo números'
    },
  }
}
  
export default validation