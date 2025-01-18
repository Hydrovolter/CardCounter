// Constants for validation
const MIN_INTERVAL = 0.1;
const MIN_TURNS = 1;

var count = 0;
var turns = 20;
var sessionActive = false; // Flag to track session activity
var countVisible = false; // Flag to track count visibility

var SUITS = ["clubs", "diamonds", "hearts", "spades"];
var CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"];
var count_map = {
  '2': 1,
  '3': 1,
  '4': 1,
  '5': 1,
  '6': 1,
  '7': 0,
  '8': 0,
  '9': 0,
  '10': -1,
  'j': -1,
  'q': -1,
  'k': -1,
  'a': -1
};

var getNextCard = function() {
  var rand_suit1 = SUITS[Math.floor(Math.random() * SUITS.length)];
  var rand_card1 = CARDS[Math.floor(Math.random() * CARDS.length)];
  var rand_suit2 = SUITS[Math.floor(Math.random() * SUITS.length)];
  var rand_card2 = CARDS[Math.floor(Math.random() * CARDS.length)];
  count += count_map[rand_card1] + count_map[rand_card2];
  $('#curcount').html(count);
  $('#curcard1').attr('src', "img/" + rand_suit1 + "-" + rand_card1 + "-150.png");
  $('#curcard2').attr('src', "img/" + rand_suit2 + "-" + rand_card2 + "-150.png");
};

var cur_turn = 0;
var start = function() {
  getNextCard();
  cur_turn += 1;
  if (cur_turn == turns) {
    sessionActive = false; // End the session
    // Create the button only if it doesn't already exist
    if (!$('#displaycount').length) {
      $("#info").append($("<input id='displaycount' type='button' value='show count'>").click(function() {
        countVisible = !countVisible; // Toggle count visibility
        if (countVisible) {
          $('#curcount').show();
          $(this).val("hide count");
        } else {
          $('#curcount').hide();
          $(this).val("show count");
        }
      }));
    }
  } else {
    setTimeout(start, interval);
  }
};

$(document).ready(function() {
  $('#curcount').hide();
  getNextCard();
  count = 0;
  cur_turn = 0;
  $('#cardcountingform').submit(function(event) {
    event.preventDefault();

    // Get the user input for interval and turns
    var intervalInput = $("#interval").val();
    var turnsInput = $("#turns").val();

    // Validate interval (must be a number and >= MIN_INTERVAL)
    if (isNaN(intervalInput) || Number(intervalInput) < MIN_INTERVAL) {
      alert("Please enter a valid interval (greater than or equal to " + MIN_INTERVAL + " seconds).");
      return;
    }

    // Validate turns (must be a whole number and >= MIN_TURNS)
    if (!Number.isInteger(Number(turnsInput)) || Number(turnsInput) < MIN_TURNS) {
      alert("Please enter a valid number of turns (greater than or equal to " + MIN_TURNS + ").");
      return;
    }

    if (sessionActive) {
      alert("A session is already in progress.");
      return;
    }

    sessionActive = true; // Start a new session
    interval = 1000 * Number(intervalInput);
    turns = Number(turnsInput);
    count = 0;
    cur_turn = 0;
    start();
  });
});
