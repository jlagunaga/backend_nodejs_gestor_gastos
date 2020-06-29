const JwtStrategy= require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const global = require('../src/Utiles/global');



var opt ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // estrae el token que llega en la gabecera de la peticion
    secretOrKey: 'secretKey'
};

 const jwt_Strategy = new JwtStrategy(opt,(jwtPayload,done)=>{
    console.log('console log desde passport JWT');
    let _global=new global();
    try {
        var usuario= _global.getUsuario(jwtPayload.id);
        if(usuario){
            
            return done(null,usuario);
            
        }
            return done(null,false);
    } catch (error) {
        console.log("error validacion passport" + error);
    }
});

module.exports = jwt_Strategy;


/* server.use(passport.initialize());
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    User.authenticate()
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'ILovePokemon'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload.id)
            .then(user =&gt; {
                return cb(null, user);
            })
            .catch(err =&gt; {
                return cb(err);
            });
    }
)); */
