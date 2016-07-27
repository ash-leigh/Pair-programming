var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json());
app.use(express.static('client/build'));

var url = 'mongodb://localhost:27017/bucketList'

app.get('/', function(req, res){
  res.sendFile(pth.join(__dirname + 'client/build/index.html'))
})

app.get('/countries', function(req, res){
  MongoClient.connect(url, function(err, db){
    var collection = db.collection('countries');
    console.log(collection);
    collection.find({}).toArray( function(err, docs){
      res.json(docs);
      db.close();
    })
  })
})

//add country
app.post('/', function(req, res){
  // console.log(req.body);
  res.status(200).end();
  MongoClient.connect(url, function(err, db){
    var collection = db.collection('countries');
    collection.insert(
      {
        "name": req.body.name,
        "population": req.body.population,
        "lat": req.body.lat,
        "lng": req.body.lng
      }
    )
    res.status(200).end();
    db.close();
  })
})

app.listen('3000', function(){
  console.log('Running on 3000');
})

