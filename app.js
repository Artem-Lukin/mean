var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');

var bcrypt = require('bcrypt-nodejs'); 
var passport = require('passport'); //���������� passportjs ��� ��������������
var LocalStrategy = require('passport-local').Strategy; //���������� ��������� ��������
var session = require('express-session'); // ��� ��������� �������
var mongoose = require('mongoose'); //��� mongodb, ���� ������
var models_user = require('./public/Models/user.js'); // ��������� �� ������ � server
// ����� � ����� ������
mongoose.connect('mongodb://localhost/database');
// ����������� ��������������
var authenticate = require('./routes/authentication')(passport);

var app = express();

const basicAuth = require('./public/javascripts/auth.js');
var challengeAuth = basicAuth({
    authorizer: myAuthorizer,
    challenge: true
})

// view engine setup
app.set('views', path.join(__dirname, 'Views'));
//app.set('admin', path.join(__dirname, 'Views/admin'));

app.set('view engine', 'ejs');
app.get('/admin', challengeAuth, function(req, res) { //rabotaet
   res.status(200).render('./admin/Starter');
})
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use(express.static(path.join(__dirname, 'public/Controllers')));
app.use(express.static(path.join(__dirname, 'public/Models')));
app.use(express.static(path.join(__dirname, 'public/modules')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
*/



app.use(session({
  secret: 'keyboard cat'
}));
app.use(passport.initialize()); // ������������� ��������
app.use(passport.session()); // ������������� ������ ��������


app.use('/', index);

app.use('/auth', authenticate);
app.use(express.static(path.join(__dirname, 'Views/Main')));
app.use(express.static(path.join(__dirname, 'Views/Authentification')));

//��������� auth-api ��� ��������, ���, ����� �� ��� ��� ������������.
var initPassport = require('./Passport/passport_init');
initPassport(passport);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function myAuthorizer(username, password) {
    return username.startsWith('admin') && password.startsWith('admin')
}


module.exports = app;
