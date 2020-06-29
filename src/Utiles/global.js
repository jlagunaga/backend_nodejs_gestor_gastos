var mysqlConnection = require('../database');
var url = require('../Utiles/utiles'); // contiene ruta de servidor
var fs = require('fs'); // libreria para manejo de archivos en el servidor

class global {
    async getUsuario(id) {
        let query = `select * from usuarios where ID_USUARIO=${id}`;
        var response = 'default';
        response = await mysqlConnection.query(query);

        return response;
    }

    /* Elimina unaa imagen del servidor, se debe ingresar la URL de la imagen guardada  */
    eliminarImagen(NombreImg) {
        let nombre_Edit = NombreImg.substring(NombreImg.lastIndexOf('/') + 1);

        fs.readFile(url.urlImagen + '/' + nombre_Edit, (err, data) => {
            if (!err) {
                fs.unlinkSync(url.urlImagen + '/' + nombre_Edit);
            } else {
                console.log('error: ', err);
            }
        });
    }


} // fin de clase 



module.exports = global;