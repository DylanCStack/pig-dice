//business logic
var dieFace = {1: "img/1.gif", 2: "img/2.gif", 3: "img/3.gif", 4: "img/4.gif", 5: "img/5.gif", 6: "img/6.gif"}; // dictionary of images to correspond with dice roll values (1-6).


function Player(name) { //constructor to create Player objects
  this.name = name; // each player will have a name associated with the object.
  this.score = 0; // starting score for each player will be 0.
}

function Game(winningscore, maxrounds, players) { //constructor to create Game objects.
  this.winningscore = winningscore;
  this.maxrounds = maxrounds;
  this.players = players; // each Game will have a list of players
  this.currentplayer = players[0]; // players list will include all current players (first name entered will be the first player listed) and start at currentplayer at the 0th position.
  this.roundTotal = 0; // for each round in the game total points starts at 0.
}

Game.prototype.switchPlayer = function() { // creates method to switch players
    if (this.currentplayer === this.players[0]) { // if current player is equal to the 0th place player, switch to the 1st place player.
      this.currentplayer = this.players[1];
    } else if (this.currentplayer === this.players[1]) { // vice versa
      this.currentplayer = this.players[0];
    }
    $("#current-player").text(this.currentplayer.name); // each time we run the function repopulate the display name with current player's name.
}
Game.prototype.hold = function() { // creates method to allow user to "hold"
  this.currentplayer.score += this.roundTotal; // current player's score is a summation of urrent round total added to total of all previous rounds.
  this.roundTotal = 0; // round total score set back to 0.
  this.switchPlayer(); // run switchPlayer method to change players.
}
Game.prototype.roll = function() { // creates method to allow user to roll the dice.
  var currentRoll = Math.ceil(Math.random() * 6); // generates random number between 1-6.
  if (currentRoll === 1) {// if that generated number is equal to one change roundtotal to "0" and switch player.
    this.roundTotal = 0;
    this.switchPlayer();
  } else {
    this.roundTotal += currentRoll; // if number generated is 2-6 add currentRoll to current round total amount.
  }
  return currentRoll; // store currentRoll value to access pass into dictionary
}
Game.prototype.checkVictory = function() { // creates method to check if the current total score for current player meets or exceeds number hard-coded in the UI section(discussed making an input form for user to define value).
  if (this.currentplayer.score + this.roundTotal >= this.winningscore) {
    this.currentplayer.score += this.roundTotal;
    $("#player1Score").text(this.players[0].score);
    $("#player2Score").text(this.players[1].score);
    $("#win").text("Congrats, you won!");
  }
}
// };

//user interface logic
$(document).ready(function() {
  $("form#names").submit(function(event) {
    event.preventDefault();
    var inputtedName1 = $("input[name=name1]").val();
    var inputtedName2 = $("input[name=name2]").val();
    var winningScore = 10;//make it take user input later

    var player1 = new Player(inputtedName1);
    var player2 = new Player(inputtedName2);

    var game = new Game(winningScore, 1000, [player1, player2]);

    $("#player1").text(inputtedName1);
    $("#player2").text(inputtedName2);

    $("#current-player").text(game.currentplayer.name);

    $("#roll").click(function() {
      var thisRoll = game.roll();


      $("#last-roll").html("<img src='" + dieFace[thisRoll] + "'>");
      $("#round-total").text(game.roundTotal);

      game.checkVictory();
    })
    $("#hold").click(function(){
      game.hold();
      $("#player1Score").text(player1.score);
      $("#player2Score").text(player2.score);
    })
  })
})
