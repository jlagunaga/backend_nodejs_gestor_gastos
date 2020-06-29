var express = require('express');
var route = express.Router(); 
var  passport = require('passport'); // passport para autenticacion
var jwt = require('jsonwebtoken'); // libreria para generar crear token de seguridad para autenticacion
var mysqlConnection = require('../database'); // objeto que contiene la confirgacion para la conecxion a Mysql
var upload = require('../lib/storage'); // contiene la libreria Multer configurada para la subida de archivos
var url = require('../Utiles/utiles'); // contiene ruta de servidor
var fs = require('fs'); // libreria para manejo de archivos en el servidor
var bcrypt = require('bcrypt'); // libreria para encriptar contraseñas 
var global= require('../Utiles/global'); // libreria de utiles 

// instancias de variables globales
var _global = new global();


// se crea el tokken 
function createToken(user) {
    return jwt.sign({
        id: user.ID_USUARIO,
        user: user.USUARIO
    }, 'secretKey',{ expiresIn: 86400 * 7 });
}

/* ::::::::::::: SERVICIO USUARIOS  ::::::::::::: */

// seleccionar usuario por id:
route.get('/usuarios/:id', (req, res) => {
    var {
        id
    } = req.params;
    mysqlConnection.query('call select_Usuarios(?);', [id], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.json(rows[0]); // se agrega [0] agrega para solo traer datos del array
            } else {
                res.status(200).send({
                    message: "no se encontro categoria "
                });
            }
        } else {
            console.log(err);
            res.status(404).send({
                messaje: "error en la busqueda"
            });
        }
    });
});

// slecciona todas los usuarios
route.get('/usuarios', (req, res) => {
    mysqlConnection.query('call select_Usuarios(0);', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]); // se agsrega [0] agrega para solo traer datos del array
        } else {
            console.log(err);
        }
    });
});


// guardar usuarios 
route.post('/usuarios', (req, res) => {
    //var urlImagen= url.host+'api/img/'+req.file.filename;
    var {
        NOMBRES,
        APELLIDOS,
        EMAIL,
        CEL,
        USUARIO,
        PASSWORD,
        ESTADO,
        TIPO_USU,
        IMAGEN,
        OBSERVACION
    } = req.body;
    var pass_crypt;

    // encriptar contraseña
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(PASSWORD, salt, function (err, hash) {
            if (hash) {
                // guardar en bd 
                mysqlConnection.query('call saveModify_usuarios(0,?,?,?,?,?,?,?,?,?,?);',
                    [NOMBRES, APELLIDOS, EMAIL, CEL, USUARIO, , ESTADO, TIPO_USU, IMAGEN, OBSERVACION],
                    (err, rows, fields) => {
                        if (!err) {
                            res.status(200).send({
                                message: 'se guardo ',
                                id: rows[0]
                            });
                        } else {
                            console.log(err);
                        }
                    });

            } else {
                pass_crypt = 'error';
                console.log('error al encryptar: ' + err);
            }

        });
    });


});

// modificar usuarios
route.put('/usuarios/:id', (req, res) => {
    var {
        id
    } = req.params;
    var {
        NOMBRES,
        APELLIDOS,
        EMAIL,
        CEL,
        USUARIO,
        PASSWORD,
        ESTADO,
        TIPO_USU,
        IMAGEN,
        OBSERVACION
    } = req.body;

    mysqlConnection.query('call saveModify_usuarios(?,?,?,?,?,?,?,?,?,?,?);',
        [id, NOMBRES, APELLIDOS, EMAIL, CEL, USUARIO, PASSWORD, ESTADO, TIPO_USU, IMAGEN, OBSERVACION],
        (err, rows, fields) => {
            if (!err) {
                res.status(200).send({
                    message: 'se modifico el id: ' + id
                });
            } else {
                console.log(err);
            }
        });

});

// modificar imagen de usuario
route.post('/usuario-image/:id', upload.single('imagen'), (req, res) => {
    var {
        id
    } = req.params;
    var urlImagen = url.host + 'api/img/' + req.file.filename;
    mysqlConnection.query("CALL edit_imagen_Usuario(?,?)", [id, urlImagen], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({
                message: "Imagen actualizada"
            });
            // eliminamos imagen
            _global.eliminarImagen(rows[0][0].IMAGEN);
            //eliminarImagen(rows[0][0].IMAGEN);
        } else {
            console.log(err);
        }
    });

});

// desactivar usuario 
route.delete('/usuario-desac/:id', (req, res) => {
    var {
        id
    } = req.params;
    mysqlConnection.query("call desactivar_Usuario (?)", [id], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({
                message: "Usuario Desactivado"
            });
        } else {
            console.log(err);
        }
    });

});


/// Loguin para usuario 
route.post('/login', (req, res) => {
    var {
        USUARIO,
        PASSWORD
    } = req.body;
    // validar contraseña con bcrypt 
    let query = `select ID_USUARIO, USUARIO, PASSWORD from usuarios 
                WHERE USUARIO='${USUARIO}' AND (ESTADO!='Inactivo' or ESTADO!='inactivo')`;

    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err && rows.length > 0) {
            if (valUsuario(PASSWORD, rows[0].PASSWORD)) {
                res.status(200).send({
                    Resultado: "se guardo el token",
                    token: createToken(rows[0])
                });
            } else {
                res.status(200).send({
                    message: 'Constraseña incorrecta'
                });
            }
        } else {
            console.log('Error' + err);
            res.status(404).send('error');
        }
    });
});

// ruta de prueba
route.get('/protected', passport.authenticate('jwt',{session:false}), (req, res) => {
    console.log('protected');
    res.send('accedio');

});

module.exports = route;

// ::::::::::: metodos :::::::::::


// Validar Usuario

function valUsuario(pass, passBD) {
    return bcrypt.compareSync(pass, passBD);
}