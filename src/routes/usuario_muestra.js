var express = require('express')
var route = express.Router();
const mysqlConnection = require('../database');
var jwt = require('jsonwebtoken');

// variables 
var token;

// obtener todos los usuarios 
route.get('/user', validarTokken, (req, res) => {
    mysqlConnection.query('select * from usuario', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });

});

// validar usuario 
route.post('/user', (req, res) => {
    var {
        usuario,
        password
    } = req.body;

    const query = 'select * from usuario where usuario=?;';
    mysqlConnection.query(query, [usuario], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                if (rows[0].PASSWORD != password) res.json({
                    message: 'contraseña incorrecta'
                });
                else {
                    token = jwt.sign({
                        id: rows[0].ID_USUARIO
                    }, 'secretkey'); // pasado la validacion secrea y guarda el key 
                    res.json({token:token});
                };
            } else {
                res.json({
                    message: 'usuario no encontrado'
                });
            }
        } else {
            console.log(err);
        }
    });
});


module.exports = route;

// ***************** funciones para validar  **************
function validarTokken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('nu aoutorizado');
    }
    var objToken=req.headers.authorization.split(' ')[1];
    if (objToken==null) return res.status(401).send('nu aoutorizado');

    var pyload= jwt.verify(objToken,'secretkey');
    console.log(pyload.id);
    req.userID=pyload.id;
}

