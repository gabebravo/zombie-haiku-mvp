
$(document).ready( function() {

  const BASE_URL = '/haiku';
  const TEMPLATE = '/temp';

  (function IIFE() {

    $('#submit').click(handler);

    function handler(){
      var randTemplate = Math.ceil(Math.random() * 1);
      var template = TEMPLATE.concat(randTemplate);
      request(template);
    }

    function request(templ) {
      $.get(BASE_URL + templ, response);
    }

    function response(data){
      printHaiku(data);
    }

  })();

  function printHaiku(dataObj){
    let text = (`
      ${dataObj.art1} ${dataObj.noun1} ${dataObj.verb1}<br>
      ${dataObj.name1} ${dataObj.adj1} ${dataObj.verb2}<br>
      ${dataObj.verb3} ${dataObj.adj2} ${dataObj.noun2}
    `);
    $('.main').html(text);
  }

});

//HAIKU TEMPLATES:
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
