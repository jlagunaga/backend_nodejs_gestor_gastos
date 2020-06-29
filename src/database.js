const mysql = require('mysql');
const {promisify} = require('util');//  se usa promisify para permitir a utilizar async await a los metodos MYSQL


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_gestor_gastos'
});

mysqlConnection.connect(function (error) {
    if(error){
        console.log(error);
    }else{
        console.log('db conectada');
    }
  });

mysqlConnection.query= promisify(mysqlConnection.query);


  module.exports=mysqlConnection;