import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://192.168.1.11:3030`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    async getUsuarios() {
        return await apiClient.get('/usuarios')
    },
    async getSucursales() {
        return await apiClient.get('/sucursales')
    },
    async getClientes() {
        return await apiClient.get('/clientes')
    },
    async updateUsuario(id, nuevoRol) {
        return await apiClient.post(`/usuarios/${id}/cambiarRol`, { "rol": nuevoRol })
    },
    async login(dni, pass) {
        return await apiClient.post(`/login`, { "dni": dni, "pass": pass })
    },
    async search(valores) {
        return await apiClient.post('/resultados', valores)
    },
    async correo(elCorreo) {
        return await apiClient.post('/email', { "para": elCorreo.para, "asunto": elCorreo.asunto, "cuerpoMensaje": elCorreo.cuerpoMensaje, "resultados": elCorreo.resultados })
    }
}