var express = require('express');
var app= express();
var mongojs= require('mongojs');
var db= mongojs('contactlist',['contactlist']);
var bodyParser= require('body-parser');


 app.use(express.static(__dirname + "/public"));
 app.use(bodyParser.json());



//get rqst
 app.get('/contactlist', function(req, res){
 	console.log("I received the get request");

 	db.contactlist.find(function(err, docs){

 	if(err) console.log("Error finding data");
 	else{	console.log(docs);
 		res.json(docs); //inserts data and respond with it so that
 		}				//controller senses the new data
 	});

 });



//post rqst
app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});



//delete rqst
app.delete('/contactlist/:id', function(req, res){
	var id=req.params.id;
	console.log(id);
	db.contactlist.remove({ "_id": db.ObjectId(id) }, function(err, doc){
		if(err){ console.log("Error deleting!");}
		else{ console.log("Data successfully removed from database");
			res.json(doc); }
	})
});







//finding to data to update to put it in input boxes allowing user to modify it
 app.get('/contactlist/:id', function(req, res){
 	

 var id= req.params.id;
 console.log(id);

 	db.contactlist.findOne({ _id: db.ObjectId(id) } ,function(err, docs){

 		if(err) console.log("Error retrieving data");
 		else {	console.log("Data to be updated fetched from database!");    
 			res.json(docs); } 
 	});

 });







//updating the request
app.put('/contactlist/:id', function(req, res){
	var id=req.params.id;
	console.log(req.body.name);

db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
	update: {set: {name: req.body.name, email: req.body.email, number: req.body.number}},
	new: true}, function(err, doc){

		if(err) throw err;
		else {console.log("Data updated in database");
		res.json(doc); }
	}


	);

});



 app.listen(3000);
 console.log('Server running on port 3000');