
$(document).ready( function() {

  $('#submit').on('click', function(){
    console.log('clicked');
    printHaiku();
  });

  function printHaiku(){
    let text = (`
      The zomibe shamble<br>
      Carol and bloody chopping<br>
      Ravage moaning corpse
    `);
    $('.main').html(text);
  }

});


//HAIKU TEMPLATES:
//outlines the formula for haiku format1
// var format1 = new Object();
//     format1.haikuLine1 = art.word + " " + noun1.word + " " + verb1.word + ",";
//     format1.haikuLine2 = name1.word + " and " + adjective1.word + " " + verb2.word + ",";
//     format1.haikuLine3 = verb3.word + " " + adjective2.word + " " + noun2.word + ".";
//
//
// //outlines the formula for haiku format2
// var format2 = new Object();
//     format2.haikuLine1 = name1.word + " " + verb1.word + " " + adjective1.word + ",";
//     format2.haikuLine2 = verb2.word +  " " + noun1.word + ",";
//     format2.haikuLine3 = adjective2.word + " " + verb3.word + " " + noun2.word + ".";
//
//
// //outlines the formula for haiku format3
// var format3 = new Object();
//     format3.haikuLine1 = art.word + " " + adjective1.word + " " + noun1.word + ",";
//     format3.haikuLine2 = verb1.word + " " + adjective2.word + " " + noun2.word + ",";
//     format3.haikuLine3 = name1.word + " and " + name2.word + " " + verb2.word + ".";
