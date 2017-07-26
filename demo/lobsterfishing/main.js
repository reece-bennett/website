/* jshint devel: true, globalstrict: true, browser: true, esnext: true, curly: true, noarg: true, undef: true, unused: false */
"use strict";

// HTML Elements
var message = document.getElementById("messageDisplayInner");
var playTable = document.getElementById("playTable");
var b_in = document.getElementById("moreIn");
var b_out = document.getElementById("moreOut");
var b_roll = document.getElementById("roll");
var b_more = document.getElementById("buyMore");
var b_less = document.getElementById("buyLess");
var b_buy = document.getElementById("buy");

// Game variables
var dice = 1;
var day = 1;
var pots = 5;
var potsIn = 5;
var potsOut = 0;
var money = 0;
var potsBuying = 0;

function morePotsIn() {
  if (potsIn < pots && !b_in.classList.contains("inactive")) {
    potsIn++;
    potsOut--;
    updateSheet();

    // Make buttons active/inactive
    b_out.className = "button";
    if (potsOut === 0) { b_in.className = "button inactive"; }
  }
}

function morePotsOut() {
  if (potsOut < pots && !b_out.classList.contains("inactive")) {
    potsOut++;
    potsIn--;
    updateSheet();

    // Make buttons active/inactive
    b_in.className = "button";
    if (potsIn === 0) { b_out.className = "button inactive"; }
  }
}

function rollDice() {

  if (!b_roll.classList.contains("inactive")) {
    var profit;

    // Do the actual roll
    dice = Math.ceil(Math.random() * 6);
    console.log(dice);

    // Is it fine or stormy?
    if (dice === 2 | dice === 4 | dice === 6) {

      playTable.rows[day].cells[3].innerHTML = " Fine ";
      profit = potsIn + 6 * potsOut;
      money += profit;

      message.innerHTML = "The weather is fine.<br>You've made &pound" + profit +
      " giving you a total of &pound" + money;

    } else {

      playTable.rows[day].cells[3].innerHTML = "Stormy";
      profit = 3 * potsIn;
      money += profit;
      pots -= potsOut;

      message.innerHTML = "The weather is stormy.<br>You've made &pound" + profit +
      " giving you a total of &pound" + money + " <br>You lost " + potsOut + " pots at sea.";
    }

    // Update the profit and pots bought cells
    playTable.rows[day].cells[4].innerHTML = "&pound" + profit;
    playTable.rows[day].cells[5].innerHTML = 0;

    // Swap the in/out/roll buttons to inactive and buy buttons to active
    b_in.className = "button inactive";
    b_out.className = "button inactive";
    b_roll.className = "button inactive";
    b_more.className = "button";
    //b_less.className = "button";
    if ((potsBuying + 1) * 5 <= money) {
      b_buy.className = "button";
    }
  }
}

function buyMore() {
  if ((potsBuying + 1) * 5 <= money && !b_more.classList.contains("inactive")) {
    potsBuying++;
    playTable.rows[day].cells[5].innerHTML = potsBuying;

    // Make buyLess button active and more inactive if cannot buy more
    b_less.className = "button";
    if ((potsBuying + 1) * 5 > money) { b_more.className = "button inactive"; }
  }
}

function buyLess() {
  if (potsBuying > 0 && !b_less.classList.contains("inactive")) {
    potsBuying--;
    playTable.rows[day].cells[5].innerHTML = potsBuying;

    // Make buyMore button active and if pots buying = 0, less inactive
    b_more.className = "button";
    if (potsBuying === 0) { b_less.className = "button inactive"; }
  }
}

function buy() {
  if (!b_buy.classList.contains("inactive")) {

    // Confirm the pots bought and update variable and table with this
    money -= potsBuying * 5;
    playTable.rows[day].cells[6].innerHTML = "&pound" + money;
    pots += potsBuying;
    console.log(pots);

    // Also swap button inactivity again
    b_in.className = "button";
    b_out.className = "button";
    b_roll.className = "button";
    b_more.className = "button inactive";
    b_less.className = "button inactive";
    b_buy.className = "button inactive";

    // Make it the next day, reset variables
    day++;
    potsIn = pots;
    potsOut = 0;
    potsBuying = 0;

    // Update the message
    message.innerHTML = "It's day " + day + ". You have &pound" + money +
    " and " + pots + " pots.";

    // Add the next row
    updateSheet();
  }
}

function updateSheet() {

  var i, text;

  if (playTable.rows.length < day + 1) {

    // Make a new row
    var newRow = playTable.insertRow(-1);

    // Make 7 new cells
    for (i = 0; i < 7; i++) {
      newRow.insertCell(-1);
    }

    // Insert the day number into the first cell
    playTable.rows[day].cells[0].innerHTML = day;

    // Instruct user to move pots in/out
    message.innerHTML += "<br>Move your pots around with <b>MORE IN</b> & <B>MORE OUT</b>.<br>Then roll the dice with <b>ROLL!</b>";
  }

  // Update the In-Shore and Off-Shore pot numbers
  playTable.rows[day].cells[1].innerHTML = potsIn;
  playTable.rows[day].cells[2].innerHTML = potsOut;
}

// Initalise the sheet
updateSheet();
