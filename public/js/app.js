// because jquery is loaded in the body >>
// $(document).ready() is not neccessary

const BASE_URL = '/haiku';
const TEMPLATE = '/temp';
const RAND_INDEX = Math.floor(Math.random() * 1);

(function IIFE() {

  $('#submit').click(handler);

  function handler(){
    let template = TEMPLATE.concat(RAND_INDEX + 1);
    request(template);
  }

  function request(templ) {
    $.get(BASE_URL + templ, response);
  }

  function response(data){
    printHaiku(data, RAND_INDEX);
  }

})();

function printHaiku(dataObj, index){
  let text = [
    (`
      ${dataObj.art1} ${dataObj.noun1} ${dataObj.verb1}s<br>
      ${dataObj.name1} ${dataObj.adj1}ed and ${dataObj.verb2}ing<br>
      ${dataObj.verb3}ing ${dataObj.adj2}ed ${dataObj.noun2}
    `)
  ];
  $('.main').html(text[index]);
}

//name = 1, adj = 2 + 1 // 4 //
//name = 2, adj = 1 + 1 // 4 //

// ${dataObj.name1} ${dataObj.verb1} ${dataObj.adj1}<br>
// ${dataObj.verb2} ${dataObj.noun1},<br>
// ${dataObj.adj2} ${dataObj.verb3} ${dataObj.noun2}
//
// ${dataObj.art1} ${dataObj.adj1} ${dataObj.noun1}<br>
// ${dataObj.verb1} ${dataObj.adj1} ${dataObj.noun2}<br>
// ${dataObj.name1} and ${dataObj.name2} ${dataObj.verb2}
