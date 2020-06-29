const express = require('express');
const passport = require('passport');
const jwt_Strategy = require('../passport/local-aputh');

// inicializamos
const app = express();

// settings
app.set('port', process.env.PORT || 4000); // definimos puerto, esi existe puerto se toma caso contraroo usa 40000

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// meddleware
app.use(express.json()); // linea permite al servicor entender un objeto Json q recibe 
app.use(passport.initialize()); // iniciamos passport 
passport.use(jwt_Strategy); // le pasamos la configuracion de mideware


// global variables

// rutas
app.use('/api',require('./routes/usuarios'));
app.use('/api',require('./routes/categorias'));
app.use('/api/img',express.static(`${__dirname}/storage/img`));


// archivos publicos 

// starting server
app.listen(app.get('port'), () => {
console.log('utilizar la direccion: localhost:'+app.get('port'));
});