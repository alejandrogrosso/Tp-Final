import constantes from './constantes.js'

async function getUsuarios() {

    const response = await fetch(constantes.URL_USUARIOS).then(res => res.json())
        .then(data => {
            console.log('Data', data)
            return data;
        })
        .catch(err => {
            console.log('Error', err)
        })

    return await response.json;

}
export default getUsuarios;