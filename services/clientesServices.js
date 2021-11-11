import axios from 'axios'
import getSucursales from './sucursales'

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

    },/*
    postProductos(producto) {
        return apiClient.post('/productos/', producto)
    },
    deleteProducto(id) {
        return apiClient.delete('/productos/' + id)
    },
    putProducto(producto) {
        console.log(producto)
        return ('/productos/' + producto.id, producto)
    },*/
}