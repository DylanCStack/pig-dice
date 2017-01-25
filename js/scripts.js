//business logic
var roundTotal = 0;
function roll() {
  var currentRoll = Math.ceil(Math.random() * 6);
  if (currentRoll === 1) {
    roundTotal === 0;
  } else {
    roundTotal += currentRoll;
  }
  return currentRoll;
}



//user interface logic
$(document).ready(function() {

  $("#roll").click(function() {
    var output=roll()
    $("#last-roll").text(output);
    $("#round-total").text(roundTotal);
  })
})
