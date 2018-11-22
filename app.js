const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const pe = require('parse-error');
const cors = require('cors');

const v1 = require('./routes/v1');
const app = express();


const CONFIG = require('./suite/config');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//passport
app.use(passport.initialize());


const models = require('./models');
models.sequelize.authenticate().then(() => {
    console.log('connected to DB: ', CONFIG.db_name);

}).catch(err => {
    console.log('unable to connect to DB: ', CONFIG.db_name);

});

if(CONFIG.app==='auth-api'){
    models.sequelize.sync();
    //models.sequelize.sync({force: true});

}

app.use(cors());


app.use('/v1', v1);

app.use('/', function(req, res){
    res.statusCode = 200; 
    //send status
    res.json({status:"success", message:"pending api", data:{}})
});

//error 404
app.use(function(req, res, next){
    //set locals provide error dev

    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

    //error handler
    app.use(function(err, req, res, next) {
        //set locals, provide error dev
    
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};


    //render error page

    res.status(err.status || 500);
    res.render('error');
})

process.on('unhandledRejection', error => {
    console.log('Uncaught Error', pe(error));
})


module.exports = app;


//https://codeburst.io/build-a-rest-api-for-node-mysql-2018-jwt-6957bcfc7ac9