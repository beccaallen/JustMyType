// toggle upper/lower case keyboards

$("#keyboard-upper-container").hide();
$(document).keydown(function (e) {
  if (e.keyCode == 16) {
    $("#keyboard-upper-container").show();
    $("#keyboard-lower-container").hide();
  }
});
$(document).keyup(function (e) {
  if (e.keyCode == 16) {
    $("#keyboard-upper-container").hide();
    $("#keyboard-lower-container").show();
  }
});


// the type

let sentences = [
  "ten ate neite ate nee enet ite ate inet ent eate",
  "Too ato too nOt enot one totA not anot tOO aNot",
  "oat itain oat tain nate eate tea anne inant nean",
  "itant eate anot eat nato inate eat anot tain eat",
  "nee ene ate ite tent tiet ent ine ene ete ene ate",
];
let letterPosition = 0;
let sentenceIndex = 0;
let currentSentence = sentences[sentenceIndex];
let currentLetter = currentSentence[letterPosition];
let nextLetter = currentSentence[letterPosition + 1];
let numberOfMistakes = 0;
let time = 0;

//
$("#target-letter").html(currentLetter);
$("#sentence").html(currentSentence);
//
$(document).keypress(function (e) {
  $("#yellow-block").css({ "margin-left": "+=17.5px" });
  $("#" + e.keyCode).addClass("highlight");

  if(letterPosition === 0 && sentenceIndex === 0){
    setInterval(myTimer, 1000)
  }
  function myTimer (){
    time++
  }

  let keyPressed = String.fromCharCode(e.keyCode);


  if (keyPressed === currentLetter) {
    $("#feedback").append('<span class="glyphicon glyphicon-ok"></span>');
  } else {
    $("#feedback").append('<span class="glyphicon glyphicon-remove"></span>');
    numberOfMistakes++;
  }

  if (sentenceIndex < sentences.length) {
    if (letterPosition < currentSentence.length - 1) {
      letterPosition++;
      currentLetter = currentSentence[letterPosition];
      $("#target-letter").html(currentLetter);
      $("#sentence").html(currentSentence);
    } else {
      sentenceIndex++;
      letterPosition = 0;
      currentSentence = sentences[sentenceIndex];
      currentLetter = currentSentence[letterPosition];
      $("#yellow-block").css({ "margin-left": "0px" });
      $("#target-letter").html(currentLetter);
      $("#sentence").html(currentSentence);
      $("#feedback").empty();
      // console.log(time);
    }
  }
  
  if (sentenceIndex == 5) {
    let timeInMinutes = time / 60
    // let cPM = Math.round((240 - numberOfMistakes) / timeInMinutes);
    let score = Math.round(((240 - numberOfMistakes)/5)/timeInMinutes)
    // let score = 54 / timeInMinutes - 2 * numberOfMistakes;
    $("#sentence").html(
      "You did It! You had " + score + " words per minute! Good Job :)"
      );
      $("#feedback").empty();
      $("#yellow-block").css({ visibility: "hidden" });
      $("#target-letter").empty();
    
    
    function playAgain() {
      $("#target-letter").append('<button type="button" class="btn btn-success" onClick="window.location.reload();">Play Again</button>')
    }

    window.setTimeout(playAgain, 3000);
  }
});
$(this).keyup(function () {
  $(".highlight").removeClass("highlight");
});

// console.log(sentences[0].length + sentences[1].length + sentences[2].length + sentences[3].length + sentences[4].length);`