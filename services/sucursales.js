import constantes from './constantes.js'

const getSucursales = async () => {
    return await fetch(constantes.URL_SUCURSALES)
}
export default getSucursales;