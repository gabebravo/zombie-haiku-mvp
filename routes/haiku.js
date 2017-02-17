
const express = require('express');
const router  =  express.Router();
const mongoose = require('mongoose');

const haikuSchema = require('../schemas/haiku');
const Haiku = mongoose.model('Haiku', haikuSchema);

function getHaiku(req, res) {
  let zMap = {};
  let syllCount = 0;

  Haiku.find({ type: "article" }, {'_id': 0, 'word': 1, 'syllables': 1})
  .then(haikus => {
    syllCount += mapAndReturnCount(haikus, zMap, "art1");
    return Haiku.find({ type: "noun" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').gte(2).lte(3)
  })
  .then(haikus => {
    syllCount += mapAndReturnCount(haikus, zMap, "noun1");
    return Haiku.find({ type: "verb" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').eq(5-syllCount);
  })
  .then(haikus => {
    syllCount += mapAndReturnCount(haikus, zMap, "verb1");
    syllCount = 0;
    return Haiku.find({ type: "character" }, {'_id': 0, 'word': 1, 'syllables': 1})
  })
  .then(haikus => {
    syllCount += mapAndReturnCount(haikus, zMap, "name1");
      if(syllCount == 1) {
        syllCount += 1;
        return Haiku.find({ type: "adjective" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').eq(2);
      } else {
        syllCount += 1;
        return Haiku.find({ type: "adjective" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').eq(1);
      }
  })
  .then(haikus => {
    syllCount += mapAndReturnCount(haikus, zMap, "adj1");
    return Haiku.find({ type: "verb" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').eq(2);
  })
  .then(haikus => {
    syllCount += mapAndReturnCount(haikus, zMap, "verb2");
    syllCount = 0;
    return Haiku.find({ type: "verb" }, {'_id': 0, 'word': 1, 'syllables': 1});
  })
  .then(haikus => {
    syllCount += mapAndReturnCount(haikus, zMap, "verb3");
    if(syllCount == 2) {
      syllCount += 1;
      return Haiku.find({ type: "adjective" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').eq(1);
    } else {
      syllCount += 1;
      return Haiku.find({ type: "adjective" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').eq(2);
    }
  })
  .then(haikus => {
    syllCount += mapAndReturnCount(haikus, zMap, "adj2");
    return Haiku.find({ type: "noun" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').eq(5-syllCount);
  })
  .then(haikus => {
    mapAndReturnCount(haikus, zMap, "noun2");
    res.status(200).json(zMap);
  })
  .catch(
    err => {
      res.status(500).json({message: err});
  });
}

function mapAndReturnCount(arr, obj, keyName) {

  let randInx = Math.floor(Math.random() * arr.length);
  let randObj = arr[randInx];

    if(Object.keys(obj).length === 0){
     obj[keyName] = randObj.word;
     return randObj.syllables;
    }
    if(!hasValue(randObj.word, obj)){
      obj[keyName] = randObj.word;
      return randObj.syllables;
    } else {

      while(hasValue(randObj.word, obj)){

        randInx = Math.floor(Math.random() * arr.length);
        randObj = arr[randInx];

        if(!hasValue(randObj.word, obj)){
          obj[keyName] = randObj.word;
          return randObj.syllables;
        }

      }
    }
}

function hasValue(chkVal, obj){
  let result = false;
  for (let val in obj) {
    if(obj[val] === chkVal){
      console.log('true');
      result = true;
    }
  }
  return result;
}

// controllers
router.get('/temp1', getHaiku);

//export Haiku
module.exports = router;
