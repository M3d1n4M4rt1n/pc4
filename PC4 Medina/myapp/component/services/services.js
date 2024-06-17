class ServiciosAPI {
    obtenerDatos(callback) {
        const urlAPI = 'json/datos_entrenadores.json';        
        fetch(urlAPI)
            .then(response => response.json())
            .then(data => {
                callback(null, data);
            })
            .catch(error => {
                console.error('Error', error);
            });        
    }
}

export default ServiciosAPI;
