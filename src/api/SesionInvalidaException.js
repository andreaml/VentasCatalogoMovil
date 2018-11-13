export default class SesionInvalidaException extends Error {
    constructor(props) {
        super(props);
    }
    
    message = 'La sesión no es válida'
}