var express = require('express')
var route = express.Router();
var mysqlConnection = require('../database');

route.get('/cate-tienda', (req, res) => {
    mysqlConnection.query('', (err, rows, fields) => {

    });
});

/* ::::::::::::: CATEGORIA  INSUMO ::::::::::::: */

// seleccionar categoria por id 
route.get('/cate_insumo/:id', (req, res) => {
    var {
        id
    } = req.params;
    mysqlConnection.query('call select_Cate_Insumo(?);', [id], (err, rows, fields) => {
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

// sleecciona todas las categorias
route.get('/cate_insumo', (req, res) => {
    mysqlConnection.query('call select_Cate_Insumo(0);', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);// se agrega [0] agrega para solo traer datos del array
        } else {
            console.log(err);
        }
    });
});

// guardar categoria insumo
route.post('/cate_insumo', (req, res) => {
    var {
        id,
        NOMBRE_INSUMO,
        DESCRIPCION
    } = req.body;

    mysqlConnection.query('call saveModify_Cate_Insumo(0,?,?);',[NOMBRE_INSUMO,DESCRIPCION], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se guardo '});
        } else {
            console.log(err);
        }
    });
});

// modificar categoria insumo
route.put('/cate_insumo/:id', (req, res) => {
    var {id}=req.params;
    var {
        NOMBRE_INSUMO,
        DESCRIPCION
    } = req.body;

    mysqlConnection.query('call saveModify_Cate_Insumo(?,?,?);',[id,NOMBRE_INSUMO,DESCRIPCION], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se modifico el id: ' + id});
        } else {
            console.log(err);
        }
    });
});


// eliminar categoria de insumo
route.delete('/cate_insumo/:id', (req, res) => {
    var {id}=req.params;
    mysqlConnection.query('DELETE FROM cate_insumo WHERE ID_CAT_INSUMO= ?;',[id], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se borro la categoria con id : ' + id});
        } else {
            console.log(err);
        }
    });
});

/* ::::::::::::: CATEGORIA  TIENDA ::::::::::::: */

// seleccionar categoria tienda por id:
route.get('/cate_tienda/:id', (req, res) => {
    var {
        id
    } = req.params;
    mysqlConnection.query('call select_Cate_Tienda(?);', [id], (err, rows, fields) => {
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

// slecciona todas las categorias tienda
route.get('/cate_tienda', (req, res) => {
    mysqlConnection.query('call select_Cate_Tienda(0);', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);// se agrega [0] agrega para solo traer datos del array
        } else {
            console.log(err);
        }
    });
});


// guardar categoria tienda
route.post('/cate_tienda', (req, res) => {
    var {
        ID_CAT_TIENDA,
        NOMBRE_CAT_TIENDA
    } = req.body;

    mysqlConnection.query('call saveModify_Cate_Tienda(0,?);',[NOMBRE_CAT_TIENDA], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se guardo '});
        } else {
            console.log(err);
        }
    });
});

// modificar categoria tienda
route.put('/cate_tienda/:id', (req, res) => {
    var {id}=req.params;
    var {
        NOMBRE_CAT_TIENDA 
    } = req.body;

    mysqlConnection.query('call saveModify_Cate_Tienda(?,?);',[id,NOMBRE_CAT_TIENDA], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se modifico el id: ' + id});
        } else {
            console.log(err);
        }
    });
});

// eliminar categoria tienda
route.delete('/cate_tienda/:id', (req, res) => {
    var {id}=req.params;
    mysqlConnection.query('delete from cate_tienda where ID_CAT_TIENDA= ?;',[id], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se borro la categoria Tienda con id : ' + id});
        } else {
            console.log(err);
        }
    });
});


/* ::::::::::::: CATEGORIA  ENTIDAD FINANCIERA ::::::::::::: */

// seleccionar categoria entidad finan  por id:
route.get('/cate_ent_finan/:id', (req, res) => {
    var {
        id
    } = req.params;
    mysqlConnection.query('call select_Cate_Ent_Finan(?);', [id], (err, rows, fields) => {
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

// slecciona todas las categorias
route.get('/cate_ent_finan', (req, res) => {
    mysqlConnection.query('call select_Cate_Ent_Finan(0);', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);// se agrega [0] agrega para solo traer datos del array
        } else {
            console.log(err);
        }
    });
});


// guardar categoria entidad financiera
route.post('/cate_ent_finan', (req, res) => {
    var {
        NOMBRE_CATEGORIA
    } = req.body;

    mysqlConnection.query('call saveModify_Cate_Ent_Finan(0,?);',[NOMBRE_CATEGORIA], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se guardo '});
        } else {
            console.log(err);
        }
    });
});

// modificar categoria entidad financiera
route.put('/cate_ent_finan/:id', (req, res) => {
    var {id}=req.params;
    var {
        NOMBRE_CATEGORIA        
    } = req.body;

    mysqlConnection.query('call saveModify_Cate_Ent_Finan(?,?);',[id,NOMBRE_CATEGORIA], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se modifico el id: ' + id});
        } else {
            console.log(err);
        }
    });
});

// eliminar categoria tienda
route.delete('/cate_ent_finan/:id', (req, res) => {
    var {id}=req.params;
    mysqlConnection.query('delete from cate_entidad_finan where ID_CAT_FINANCIERA= ?;',[id], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se borro la categoria Tienda con id : ' + id});
        } else {
            console.log(err);
        }
    });
});


/* ::::::::::::: SERVICIO FINANCIERO  ::::::::::::: */

// seleccionar servicio financiero por id:
route.get('/servicio_finan/:id', (req, res) => {
    var {
        id
    } = req.params;
    mysqlConnection.query('call select_servicio_financiero(?);', [id], (err, rows, fields) => {
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

// slecciona todos los servicio financiero
route.get('/servicio_finan', (req, res) => {
    mysqlConnection.query('call select_servicio_financiero(0);', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);// se agrega [0] agrega para solo traer datos del array
        } else {
            console.log(err);
        }
    });
});


// guardar servicio financiero
route.post('/servicio_finan', (req, res) => {
    var {
        NOMBRE_SERV_FINAN,
        DESCRIPCION
    } = req.body;

    mysqlConnection.query('call saveModify_servicio_financiero(0,?,?);',[NOMBRE_SERV_FINAN,DESCRIPCION], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se guardo '});
        } else {
            console.log(err);
        }
    });
});

// modificar servicio financiero
route.put('/servicio_finan/:id', (req, res) => {
    var {id}=req.params;
    var {
        NOMBRE_SERV_FINAN,
        DESCRIPCION
    } = req.body;

    mysqlConnection.query('call saveModify_servicio_financiero(?,?,?);',[id,NOMBRE_SERV_FINAN,DESCRIPCION], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se modifico el id: ' + id});
        } else {
            console.log(err);
        }
    });
});

// eliminar servicio financiero
route.delete('/servicio_finan/:id', (req, res) => {
    var {id}=req.params;
    mysqlConnection.query('delete from servicio_financiero where ID_SERVICIO_FINANCIERO=?;',[id], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message:'se borro la categoria Tienda con id : ' + id});
        } else {
            console.log(err);
        }
    });
});





module.exports = route