var express = require('express');
var router = express.Router();
module.exports = function(passport){
// Отправляем состояние успешного входа в систему обратно в представление (angular)
    router.get('/success',function(req,res){
           res.send({state: 'success', user: req.user ? req.user: null});    
    });
// Отправляем состояние неудавшегося входа в систему обратно в представление (angular)
    router.get('/failure',function(req,res){
res.send({state: 'failure',user:null,message:"Неверный логин или пароль"});
    });
    // Запрос входа в систему
router.post('/login',passport.authenticate('login',{
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));
// Запрос на регистрацию в системе
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));
// Запрос на выход из системы
    router.get('/signout', function(req, res) {
        req.session.user = null;
        req.logout();
        res.redirect('/');
    });
return router;
};