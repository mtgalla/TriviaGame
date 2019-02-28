//Trivia Game

//Objects with questions and answers including the correct answer

$(document).ready (function() {
    $("#done").hide();
var game = [
{
    question: "Which of Peter's high school crushes married Harry Osborn?",
    answer: 3,
    choices:["MARY JANE WATSON", "DEBRA WHITMAN", "GWEN STACY","LIZ ALLAN"]
},
{
    question: "What other student did the radioactive spider bite besides Peter?",
    answer: 2,
    choices:["FLASH THOMPSON", "HARRY OSBORN", "CINDY MOON","LIZ ALLAN"]
},
{
    question: "What was the name of Peter Parker's uncle?",
    answer: 0,
    choices:["BEN", "NORMAN", "HARRY","GEORGE"]
},
{
    question: "What actor played Spider-Man in the 1977 TV series?",
    answer: 1,
    choices:["PARKER STEVENSON", "NICHOLAS HAMMOND", "JOHN TRAVOLTA","SHAUN CASSIDY"]
},
{
    question: "Who was the first super-villain Spider-Man ever encountered?",
    answer: 3,
    choices:["TERRIBLE TINKERER", "DOCTOR OCTOPUS", "GREEN GOBLIN","SUPERCHARGER"]
}

];
//variables for assigning wins, losses, unanswered count, others
var wins = 0;
var losses = 0;
var unanswered = 0;
var correctAnswer = ["","","","",""];
var choiceArray = ["","","","",""];
var choice = 0;
var time = 60;
var clockRunning = false;

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
//Initializer & reset function



function count() {
    //  Decrement time
     time--;
     
  // Get the current time, pass that into the timeConverter function,
  // and save the result in a variable.
  var converter = timeConverter(time);

  //  show the converted time in the "display-time" h2.
  $("#display-time").html("<h2> Time Remaining " + converter + "</h2>");
}

function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
  
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }

//stops time when Done button clicked
$("#done").on("click",function(){
    timeUp();

})

//Stop function to clearInterval and set clock to not running
function stop() {
    clearInterval()
    clearInterval(intervalId);
    clockRunning = false;
  }

//timeUp function to stop game, compare answers and show results with 
function timeUp() {
    stop();
    compareAnswers();
    showResults();
    $("#done").hide();
         $("#display-time").html("<h2>Your Results</h2>");
        console.log("time is up");
}

//click function for starting game button
$("#start").on("click",function(){
    $(this).hide();
    $("#done").show();
    $("#rules").hide();
    $("#display-time").html("<h2>Time Remaining 00:60</h2>");
    displayQuestions();
    if (!clockRunning) {
        intervalId = setInterval(count,1000);
        clockRunning = true;
        setTimeout(timeUp, 1000*60);
      }
    else{
        stop();
    }
})

//click functions for choice radio buttons
function displayQuestions(){
    var getQuestions = $("#game-board");
    getQuestions.empty();
    for (let i = 0; i < game.length; i++){
        getQuestions.append($("<br><br><h3>" + game[i].question + "</h3>"))
        for (let j = 0; j < game[i].choices.length; j++){
        getQuestions.append($("<input class=check type=radio name=choices" + i + " value=" + j + ">" + game[i].choices[j] + "</input>"));
        }
        console.log(game[i].question);
        console.log(game[i].answer);
        console.log(game[i].choices);
        console.log(game.length);
    }
}


          //This is where I've been stuck
          //I want to capture the value of radio button clicked and store that in a variable
           $("#game-board").on("change", function(i){
            $("#game-board").each(function(i){
                choice = parseInt($('input[id=radio'+i+']:checked').text());
                console.log(choice);
            })
           })

           function compareAnswers(){
           console.log(choice);
        }

        //Because the click function part is broken I "commented" out the below code
        //Here is where I would record wins, losses and unanswered and then output that to the DOM
        /*if (choiceArray[i] === correctAnswer[i]){
            wins++
        }
        else {
            losses++
            if (choice === ""){
               unanswered++
    
         }
        console.log("wins= " + wins);
        console.log("losses= " + losses);
        console.log("unanswered= " + unanswered);
    })
}

}*/

function showResults(){
    $("#game-board").html("<h3> Wins: " + wins + "</h3>");
    $("#game-board").append("<h3> Losses: " + losses + "</h3>");
    $("#game-board").append("<h3> Unanswered: " + unanswered + "</h3>");

}



});