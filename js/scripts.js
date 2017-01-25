//business logic
var roundTotal = 0;
var totalScore = 0;
var winningScore = 10;

function checkVictory() {
  if (totalScore + roundTotal >= winningScore) {
    $("#win").text("Congrats, you won!");
  }
}

function Player(name) {
  this.name = name;
  this.score = 0;
}

function Game(winningscore, maxrounds, players) {
  this.winningscore = winningscore;
  this.maxrounds = maxrounds;
  this.players = players;
  this.currentplayer = players[0];
  this.roundTotal = 0;
}

Game.protoype = {
  switchPlayer: function() {
    if (this.currentplayer === this.players[0]) {
      this.currentplayer = this.players[1];
    } else if (this.currentplayer === this.players[1]) {
      this.currentplayer = this.players[0];
    }
  },
  hold: function() {
    totalScore += roundTotal;
    roundTotal = 0;
    this.switchPlayer();
    return totalScore;
  },
  roll: function() {
    var currentRoll = Math.ceil(Math.random() * 6);
    if (currentRoll === 1) {
      roundTotal = 0;
      this.switchPlayer();
    } else {
      roundTotal += currentRoll;
    }
    return currentRoll;
  }
}

//user interface logic
$(document).ready(function() {
$("form#names").submit(function() {
    var inputtedName1 = $("input:name1").val();
    var inputtedName2 = $("input:name2").val();

    var player1 = new Player(inputtedName1);
    var player2 = new Player(inputtedName2);

    var game = new Game(winningScore, 1000, [player1, player2]);

    $("#roll").click(function() {
      var thisRoll = game.roll();
      $("#last-roll").text(thisRoll);
      $("#round-total").text(roundTotal);
      checkVictory();
    })
    $("#hold").click(function(){
      var total = game.hold();
      $("#total-score").text(total);
      $("#round-total").text(roundTotal);
    })
  })



})
