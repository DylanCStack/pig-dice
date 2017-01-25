//business logic
var roundTotal = 0;
var totalScore = 0;
function roll() {
  var currentRoll = Math.ceil(Math.random() * 6);
  if (currentRoll === 1) {
    roundTotal = 0;
  } else {
    roundTotal += currentRoll;
  }
  return currentRoll;
}

function hold() {
  totalScore += roundTotal;
  roundTotal = 0;
  return totalScore;
}



//user interface logic
$(document).ready(function() {

  $("#roll").click(function() {
    var thisRoll = roll();
    $("#last-roll").text(thisRoll);
    $("#round-total").text(roundTotal);
  })
  $("#hold").click(function(){
    var total = hold();
    $("#total-score").text(total);
    $("#round-total").text(roundTotal);
  })
})
