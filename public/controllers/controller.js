var app= angular.module("myApp", []);
	
app.controller("AppCtrl", function($scope, $http){

	console.log("Hello from controller!");


//it takes 2 functions as parameters, if the rqst is successfully 
// accomplished, first function gets executed, 
// if nt i.e., in case of error 2nd executes
	
var refresh= function(){ //bcoz we want it to get (and also show) all the data instantly 
// after some operation is performed
	$http.get('/contactlist').then(function(response){
 
 
   console.log("I am client. I got the data I requested.");
 
 $scope.contactlist = response.data;  
 $scope.contact= null; //clear input boxes after this function
 
 
 },  function(response){
   console.log("Error getting response: " + response);
 });


};
//the second parameter (error function ) is optional.


refresh(); //to refresh when pg is loaded


$scope.addContact = function(){
	console.log("Data is received from user "+ $scope.contact);

//in case if user clicks on add button after clicking on edit, if we set it to null, in either case it will add.
//equivalent to.............if ($scope.contact._id !== null) {  $scope.contact._id = null;   }
$scope.contact._id = null;


/* OR
 if (!scope.contact._id){
...#do the http request to make a new contact...
}else{
 alert("please push update to save an edit to an existing contact")
 };﻿
*/
$http.post('/contactlist', $scope.contact).then(function(response){
	console.log(response.data);
	refresh();
});

}


$scope.remove = function(id){
	console.log(id);
	$http.delete('/contactlist/' + id,id).then(function(response){
			console.log("Data received after deleting data, from server");
			refresh();
	});
};







$scope.edit = function(id){
	console.log(id);
	$http.get('/contactlist/' + id,id).then(function(response){
			console.log("Data to be updated received from server");
			$scope.contact = response.data;
			
	});
};




$scope.update = function(){

	console.log( $scope.contact.name);
	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response){

console.log("Data updated");
		refresh();	
	}); 

};





$scope.deselect = function(){
	$scope.contact = null;
}



}); 
 

  