//создаем новую модель
var mongoose = require('mongoose'); // ссылаемся на mongoose для создания понятной модели типа класса
// определяем схему для пользовательской модели
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    created_at: {type: Date, default: Date.now}
    
});
mongoose.model('User', userSchema);
var User = mongoose.model('User');
exports.findByUsername = function(userName, callback){
User.findOne({ user_name: userName}, function(err, user){
        if(err){
            return callback(err);
        }
return callback(null, user);
});
}

exports.findById = function(id, callback){
User.findById(id, function(err, user){
        if(err){
           return callback(err);
        }
         return callback(null, user);
    });
}
