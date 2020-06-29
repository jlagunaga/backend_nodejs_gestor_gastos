var expres = require('express');
var route = expres.Router();
const mysqlConnection = require('../database');


// obtener todas las categorias
route.get('/cate_insumo', (req, res) => {
    mysqlConnection.query('select * from cate_insumo', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// obtener categoria por id 
route.get('/cate_insumo/:id', (req, res) => {
    let idCateInsumo = req.params.id;
    mysqlConnection.query('select * from cate_insumo where ID_CAT_INSUMO=?', [idCateInsumo], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// nueva categoria 
route.post('/cate_insumo', (req, res) => {
    var {
        categoria
    } = req.body;

    const query = 'call cate_Insumo_addEdit(?,?);';
    console.log(categoria);
    mysqlConnection.query(query, [0,categoria], (err, rows, fields) => {
        if (!err) {
            res.json({message: 'nueva categoria de insumo guardada'});
        } else {
            console.log(err);
        }
    });
});

// modificar categoria 
route.put('/cate_insumo/:id', (req, res) => {
    let id= req.params.id;
    var {
        categoria
    } = req.body;

    const query = 'call cate_Insumo_addEdit(?,?);';
    mysqlConnection.query(query, [id,categoria], (err, rows, fields) => {
        if (!err) {
            res.json({message: 'se modifico Categoria de Insumo con id:' + id});
        } else {
            console.log(err);
        }
    });
});

// eliminar categoria
route.delete('/cate_insumo/:id', (req, res) => {
    let {id}= req.params;

    const query = 'delete from cate_insumo where ID_CAT_INSUMO=?';
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json({message: 'se elimino la categoria de insumo con id: ' + id});
        } else {
            console.log(err);
        }
    });
});

module.exports = route;