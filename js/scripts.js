//business logic
function roll() {
  return Math.ceil(Math.random() * 6);
}



//user interface logic
$(document).ready(function() {
  var roundTotal = 0;
  $("#roll").click(function() {
    roundTotal +=roll()
    $("#round-total").text(roundTotal);
  })
})
