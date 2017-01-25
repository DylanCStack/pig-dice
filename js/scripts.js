//business logic

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

Game.prototype.switchPlayer = function() {
    if (this.currentplayer === this.players[0]) {
      this.currentplayer = this.players[1];
    } else if (this.currentplayer === this.players[1]) {
      this.currentplayer = this.players[0];
    }
    $("#current-player").text(this.currentplayer.name);
}
Game.prototype.hold = function() {
  this.currentplayer.score += this.roundTotal;
  this.roundTotal = 0;
  this.switchPlayer();
}
Game.prototype.roll = function() {
  var currentRoll = Math.ceil(Math.random() * 6);
  if (currentRoll === 1) {
    this.roundTotal = 0;
    this.switchPlayer();
  } else {
    this.roundTotal += currentRoll;
  }
  return currentRoll;
}
Game.prototype.checkVictory = function() {
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

      $("#last-roll").text(thisRoll);
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
