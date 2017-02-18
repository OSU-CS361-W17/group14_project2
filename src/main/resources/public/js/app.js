var gameModel;

$( document ).ready(function() {
  // Handler for .ready() called.
  $.getJSON("model", function( json ) {
  gameModel = json;
    console.log( "JSON Data: " + json );
   });
});

function placeShip() {
   console.log($( "#shipSelec" ).val());
   console.log($( "#rowSelec" ).val());
   console.log($( "#colSelec" ).val());
   console.log($( "#orientationSelec" ).val());

   //var menuId = $( "ul.nav" ).first().attr( "id" );
   var request = $.ajax({
     url: "/placeShip/"+$( "#shipSelec" ).val()+"/"+$( "#rowSelec" ).val()+"/"+$( "#colSelec" ).val()+"/"+$( "#orientationSelec" ).val(),
     method: "post",
     data: JSON.stringify(gameModel),
     contentType: "application/json; charset=utf-8",
     dataType: "json"
   });

   request.done(function( currModel ) {
     displayGameState(currModel);
     gameModel = currModel;

   });

   request.fail(function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   });
}




function fire(){
 console.log($( "#colFire" ).val());
   console.log($( "#rowFire" ).val());
//var menuId = $( "ul.nav" ).first().attr( "id" );
   var request = $.ajax({
     url: "/fire/"+$( "#colFire" ).val()+"/"+$( "#rowFire" ).val(),
     method: "post",
     data: JSON.stringify(gameModel),
     contentType: "application/json; charset=utf-8",
     dataType: "json"
   });

   request.done(function( currModel ) {
     displayGameState(currModel);
     gameModel = currModel;

   });

   request.fail(function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   });

}

function scan(){
 console.log($( "#colScan" ).val());
   console.log($( "#rowScan" ).val());
//var menuId = $( "ul.nav" ).first().attr( "id" );
   var request = $.ajax({
     url: "/scan/"+$( "#colScan" ).val()+"/"+$( "#rowScan" ).val(),
     method: "post",
     data: JSON.stringify(gameModel),
     contentType: "application/json; charset=utf-8",
     dataType: "json"
   });

   request.done(function( currModel ) {
     displayGameState(currModel);
     gameModel = currModel;

   });

   request.fail(function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   });

}


function log(logContents){
    console.log(logContents);
}

function displayGameState(gameModel){
$( '#MyBoard td'  ).css("background-color", "blue");
$( '#TheirBoard td'  ).css("background-color", "blue");

if(gameModel.scanResult){
alert("Scan found at least one Ship")}
else{
alert("Scan found no Ships")}

displayShip(gameModel.aircraftCarrier);
displayShip(gameModel.battleship);
displayShip(gameModel.cruiser);
displayShip(gameModel.destroyer);
displayShip(gameModel.submarine);

for (var i = 0; i < gameModel.computerMisses.length; i++) {
   $( '#TheirBoard #' + gameModel.computerMisses[i].Across + '_' + gameModel.computerMisses[i].Down ).css("background-color", "green");
}
for (var i = 0; i < gameModel.computerHits.length; i++) {
   $( '#TheirBoard #' + gameModel.computerHits[i].Across + '_' + gameModel.computerHits[i].Down ).css("background-color", "red");
}

for (var i = 0; i < gameModel.playerMisses.length; i++) {
   $( '#MyBoard #' + gameModel.playerMisses[i].Across + '_' + gameModel.playerMisses[i].Down ).css("background-color", "green");
}
for (var i = 0; i < gameModel.playerHits.length; i++) {
   $( '#MyBoard #' + gameModel.playerHits[i].Across + '_' + gameModel.playerHits[i].Down ).css("background-color", "red");
}



}



function displayShip(ship){
 startCoordAcross = ship.start.Across;
 startCoordDown = ship.start.Down;
 endCoordAcross = ship.end.Across;
 endCoordDown = ship.end.Down;
// console.log(startCoordAcross);
 if(startCoordAcross > 0){
    if(startCoordAcross == endCoordAcross){
        for (i = startCoordDown; i <= endCoordDown; i++) {
            $( '#MyBoard #'+startCoordAcross+'_'+i  ).css("background-color", "yellow");
        }
    } else {
        for (i = startCoordAcross; i <= endCoordAcross; i++) {
            $( '#MyBoard #'+i+'_'+startCoordDown  ).css("background-color", "yellow");
        }
    }
 }



}

function handleErrorFire(){
    var fireX = document.getElementById("fireX");
    var fireY = document.getElementById("fireY");
     var valX = Number(fireX.value);
     var valY = Number(fireY.value);
    var locString = "e"+fireX.value+"_"+fireY.value;
    var location = document.getElementById(locString);
    if(isNaN(valX) || isNaN(valY) || !Number.isInteger(valX) || !Number.isInteger(valY)){
        alert("Error: Invalid Input (Must be an integer between 1-10)");
    } else if((valX < 1 || valX > 10) || (valY < 1 || valY > 10)){
        alert("Error: Invalid Coordinates!");
    } else if (location.style.backgroundColor != ""){
        //For some reason, the backgroundColor is blank UNLESS you manually change it.
        //So I'm just gonna leave it as default and let it being changed manually to a different color.
        //The alternative is just to use jQuery's .css("background-color") call, to find
        //it's rgb(0,0,255).

         //Assuming no sprites, I'm just checking if the background color is blue or not (I assume it changes
         //when a ship is placed)
         //I also need to check every block in the way, though I don't know what size and what angle.
        alert("Error: Cannot fire on a location that has already been fired on!");
    } else{
        //Run the fire functions
    }
}

function handleErrorScan(){
     var fireX = document.getElementById("fireX");
     var fireY = document.getElementById("fireY");
     var valX = Number(fireX.value);
     var valY = Number(fireY.value);
     var locString = "e"+fireX.value+"_"+fireY.value;
     var location = document.getElementById(locString);
     if(isNaN(valX) || isNaN(valY) || !Number.isInteger(valX) || !Number.isInteger(valY)){
        //If either textbox values are not numbers
        alert("Error: Invalid Input (Must be an integer between 1-10)");
     } else if((valX > 10 && valX < 1) || (valY > 10 && valY < 1)){
        //Value must be between 1 and 10
        alert("Error: Invalid Coordinates!");
     } else if (location.style.backgroundColor != ""){
        alert("Error: Cannot scan a location that has already been fired on!");
     } else{
        //Run the scan function
     }
 }

function handleErrorPlace(){
     var placeX = document.getElementById("placeX");
     var placeY = document.getElementById("placeY");
     var orientation;
     if (document.getElementById("horizontal").checked) {
        orientation = 0;
     } else {
        orientation = 1;
     }
     //So this one works with radio buttons, it basically checks which one is true for later.

     var valX = Number(placeX.value);
     var valY = Number(placeY.value);
     var locString = "p"+placeX.value+"_"+placeY.value;
     var origString = locString;
     var location = document.getElementById(locString);
     if(isNaN(valX) || isNaN(valY) || !Number.isInteger(valX) || !Number.isInteger(valY)){
         alert("Error: Invalid Input (Must be an integer between 1-10)");
     } else if((valX > 10 && valX < 1) || (valY > 10 && valY < 1)){
         alert("Error: Invalid Coordinates!");
     } else {
        //This else is different from the above two. Since we're
        var ships = document.getElementsByClassName("ship");
        var currentShip;
        for(var i=0;i<ships.length;i++){
            if (ships[i].checked){
                //Find the active ship
                currentShip = ships[i];
                break;
            }
        }
        //I have no idea how we're choosing the current ship! So I'll assume
        //a radio button again.
        //I'm also assuming somewhere along the lines we'll have a value in it, so I can just
        //take the value and convert it to a number.
        var empty = true;
        for(var i=0;i<Number(currentShip.value);i++){
            //This for loop checks for how many spots the currentShip holds.
            if (orientation == 0){
                valX++;
            } else {
                valY++;
            }
            locString = "p"+valX+"_"+valY;
            location = document.getElementById(locString);

            if (location.style.backgroundColor != ""){
                alert("Error: Location " + valX + ", " + valY + " already occupied!");
                empty = false;
                break;
            }
         }
         if (empty){
            location = document.getElementById(origString);
            //I'm not sure if you need this or not for calling it, so I'll just leave this here.
            //Run the place ship function
         }
     }
 }

$(document).ready(function(){
    var fire = document.getElementById("fire_btn");
    var scan = document.getElementById("scan_btn");
    var place = document.getElementById("place_btn");
    if (fire != null && scan != null && place != null){
        fire.addEventListener('click',handleErrorFire);
        scan.addEventListener('click',handleErrorScan);
        place.addEventListener('click',handleErrorPlace);
    }
});