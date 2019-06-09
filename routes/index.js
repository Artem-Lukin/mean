var express = require('express');
var router = express.Router();
var path = require('path');


const MongoClient = require('mongodb').MongoClient;
const dbHost = 'mongodb://localhost:27017/database';
const myCollection = 'claim';
const bodyParser = require('body-parser');
//const jsonParser = express.json();
const jsonParser = bodyParser.json();



router.get('/',function(req,res,next){	
	res.render('Starter', {title:"Super App"});	
});
const objectId = require("mongodb").ObjectID;
const mongoClient = require('mongodb').MongoClient;
var global_collection
mongoClient.connect('mongodb://localhost:27017/database', function(err, client){
    if(err) return console.log(err);
    global_collection = client.db("database").collection("claim");
});

router.get("/claims", function(req, res){
        
    const collection = global_collection;
    collection.find({}).toArray(function(err, claims){
         
        if(err) return console.log(err);
        res.send(claims)
    });
     
});
router.get("/claims/:id", function(req, res){
    const id = new objectId(req.params.id);
    const collection = global_collection;
    collection.findOne({_id: id}, function(err, claim){
        if(err) return console.log(err);
        res.send(claim);
    });
});
   
router.post("/claims", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
    const ClaimSurname = req.body.surname;
    const ClaimName = req.body.name;
    const ClaimPatronymic = req.body.patronymic;
    const ClaimAdress = req.body.adress;
    const ClaimTariff = req.body.tariff;
    const ClaimPhone = req.body.phone;
    const ClaimMail = req.body.mail;
    const claim = {surname: ClaimSurname, name: ClaimName, patronymic: ClaimPatronymic, adress: ClaimAdress, tariff: ClaimTariff, phone: ClaimPhone, mail: ClaimMail};
    const collection = global_collection;
    collection.insertOne(claim, function(err, result){
               
        if(err) return console.log(err);
        res.send(claim);
    });
});
    
router.delete("/claims/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = global_collection;
    collection.findOneAndDelete({_id: id}, function(err, result){
               
        if(err) return console.log(err);    
        let claim = result.value;
        res.send(claim);
    });
});

   
router.put("/claims", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const ClaimSurname = req.body.surname;
    const ClaimName = req.body.name;
    const ClaimPatronymic = req.body.patronymic;
    const ClaimAdress = req.body.adress;
    const ClaimTariff = req.body.tariff;
    const ClaimPhone = req.body.phone;
    const ClaimMail = req.body.mail;
    const collection = global_collection;
    collection.findOneAndUpdate({_id: id}, { $set: {surname: ClaimSurname, 
                                                    name: ClaimName, 
                                                    patronymic: ClaimPatronymic, 
                                                    adress: ClaimAdress, 
                                                    tariff: ClaimTariff, 
                                                    phone: ClaimPhone,
                                                    mail: ClaimMail} },
         {returnOriginal: false },function(err, result){
               
        if(err) return console.log(err);     
        const claim = result.value;
        res.send(claim);
    });
});
///////////////////////////////////////////////////////////////
/*
router.get("/tarif", function(req, res){
        
    const collection = client.db("database").collection("tarif");
    collection.find({}).toArray(function(err, tarif){
         
        if(err) return console.log(err);
        res.send(tarif)
    });
     
});
router.get("/tarif/:id", function(req, res){
    const id = new objectId(req.params.id);
    const collection = client.db("database").collection("tarif");
    collection.findOne({_id: id}, function(err, tarif){
        if(err) return console.log(err);
        res.send(tarif);
    });
});
   
router.post("/tarif", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
    const TarifName = req.body.name;
    const TarifPrice = req.body.price;
    const TarifSpeed = req.body.speed;
    const tarif = {name: TarifName, 
                   price: TarifPrice,
                   speed: TarifSpeed,
                  };

   const collection = client.db("database").collection("tarif");
    collection.insertOne(tarif, function(err, result){
               
        if(err) return console.log(err);
        res.send(tarif);
    });
});
    
router.delete("/tarif/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = client.db("database").collection("tarif");
    collection.findOneAndDelete({_id: id}, function(err, result){
               
        if(err) return console.log(err);    
        let claim = result.value;
        res.send(tarif);
    });
});

   
router.put("/tarif", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const TarifName= req.body.name;
    const TarifPrice = req.body.price;
    const TarifSPeed = req.body.speed;
    const collection = client.db("database").collection("tarif");
    collection.findOneAndUpdate({_id: id}, { $set: {name: TarifName, 
                                                    price: TarifPrice, 
                                                    seed: TarifSPeed} },
         {returnOriginal: false },function(err, result){
               
        if(err) return console.log(err);     
        const claim = result.value;
        res.send(claim);
    });
});

router.get('/tarif', function(req, res) {
	MongoClient.connect(dbHost, function(err, db){
	   console.log('Соединились с БД...');
		  db.collection("tarif").find({}).toArray(
		    function(err, tarif){
	      	      res.send(tarif);
	        });
});
}); */
/////////////////////////////////////////////////////////////////////////////////////////////
router.get('/vivod', function(req, res) {
	MongoClient.connect(dbHost, function(err, db){
	   console.log('Соединились с БД...');
		  db.collection(myCollection).find({}).toArray(
		    function(err, vivod){
	      	      res.send(vivod);
	        });
});
});

router.get('/tarifs', function(req, res) {
	MongoClient.connect(dbHost, function(err, db){
	   console.log('Соединились с БД...');
		  db.collection('tarif').find({}).toArray(
		    function(err, tarifs){
	      	      res.send(tarifs);
	        });
});
});

router.post('/save', function(req, res) {
var users={
	"surname":req.body.surname,
	"name":req.body.name,
	"patronymic":req.body.patronymic,
	"adress":req.body.adress,
	"tariff":req.body.tariff,
	"phone":req.body.phone,
	"mail":req.body.mail
};
	MongoClient.connect(dbHost, function(err, db){
	   console.log('Соединились с БД...');
	   	  db.collection(myCollection).insert(users);
	   		 console.log('Добавили в БД...'); 
	        });
    return res.redirect(303, './#/successful' );
   // res.send(`<h1>Succes</h1>`);
        }); 
     
/*
router.post('/udalenie', function(req, res) {
var users = {
	'name': req.body.name
}
	MongoClient.connect(dbHost, function(err, db){
	   console.log('Соединились с БД...');
	   	  db.collection(myCollection).remove({"name": users.name}, function(err, recs){
	  if(err) throw err;
	  console.log("Successfully удалили ..."+ users.name);
	  })
	  });
	res.redirect(303, '/admin' );
		}); 


router.post('/redaktor', function(req, res) {
var use = {'name1': req.body.name1
};
	MongoClient.connect(dbHost, function(err, db){
	   console.log('Соединились с БД...');
	   console.log(use.name1);
	   	   	  db.collection(myCollection).update({"name": use.name1}, {
	   	   	  	"name": req.body.name,
				"surname": req.body.surname,
	   	   	  });
	   	   	  
		  });
	res.redirect(303, '/admin' );
});
	*/

module.exports = router;
