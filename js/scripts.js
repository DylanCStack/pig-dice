//business logic
function roll() {
  return Math.ceil(Math.random() * 6);
}



//user interface logic
$(document).ready(function() {
  $("#roll").click(function() {
    $("#round-total").text(roll());
  })
})
