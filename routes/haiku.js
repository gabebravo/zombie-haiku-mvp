
const express = require('express');
const router  =  express.Router();
const mongoose = require('mongoose');

const haikuSchema = require('../schemas/haiku');
const Haiku = mongoose.model('Haiku', haikuSchema);

// route models
function getWords(req, res) {
  Haiku.find( (err, words) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!words) {
      res.sendStatus(404);
    }
    res.status(200).json(words);
  });
}

function getHaiku(req, res) {
  let zMap = {};
  let syllCount = 0;

  Haiku.find({ type: "article" }, {'_id': 0, 'word': 1, 'syllables': 1})
  .then(haikus => {
    console.log(haikus);
    syllCount += mapAndReturnCount(haikus, zMap, "art1");
    console.log(zMap);
    console.log(syllCount);
    return Haiku.find({ type: "noun" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').lte(3);
  })
  .then(haikus => {
    console.log(haikus);
    syllCount += mapAndReturnCount(haikus, zMap, "noun1");
    console.log(zMap);
    console.log(syllCount);
    return Haiku.find({ type: "verb" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').lte(5-syllCount);
  })
  .then(haikus => {
    console.log(haikus);
    mapAndReturnCount(haikus, zMap, "verb1");
    console.log(zMap);
    syllCount = 0;
    console.log(syllCount);
    return Haiku.find({ type: "character" }, {'_id': 0, 'word': 1, 'syllables': 1})
  })
  .then(haikus => {
    console.log(haikus);
    syllCount += mapAndReturnCount(haikus, zMap, "name1");
    console.log(zMap);
    console.log(syllCount);
    return Haiku.find({ type: "adjective" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').lte(3);
  })
  .then(haikus => {
    console.log(haikus);
    syllCount += mapAndReturnCount(haikus, zMap, "adj1");
    console.log(zMap);
    console.log(syllCount);
    return Haiku.find({ type: "verb" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').lte(7-syllCount);
  })
  .then(haikus => {
    console.log(haikus);
    mapAndReturnCount(haikus, zMap, "verb2");
    console.log(zMap);
    syllCount = 0;
    console.log(syllCount);
    return Haiku.find({ type: "verb" }, {'_id': 0, 'word': 1, 'syllables': 1});
  })
  .then(haikus => {
    console.log(haikus);
    syllCount += mapAndReturnCount(haikus, zMap, "verb3");
    console.log(zMap);
    console.log(syllCount);
    if(syllCount == 3) {
      return Haiku.find({ type: "adjective" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').eq(1);
    } else {
      return Haiku.find({ type: "adjective" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').lte(2);
    }
  })
  .then(haikus => {
    console.log(haikus);
    syllCount += mapAndReturnCount(haikus, zMap, "adj2");
    console.log(zMap);
    console.log(syllCount);
    return Haiku.find({ type: "noun" }, {'_id': 0, 'word': 1, 'syllables': 1}).where('syllables').lte(5-syllCount);
  })
  .then(haikus => {
    console.log(haikus);
    mapAndReturnCount(haikus, zMap, "noun2");
    console.log(zMap);
    res.status(200).json(zMap);
  })
  .catch(
    err => {
      res.status(500).json({message: err});
  });
}

function mapAndReturnCount(arr, obj, keyName) {

  var randInx = Math.floor(Math.random() * arr.length);
  var randWord = arr[randInx];

    if(Object.keys(obj).length === 0){
     obj[keyName] = randWord.word;
     return randWord.syllables;
    }
    if(!hasValue(randWord, obj)){
      obj[keyName] = randWord.word;
      return randWord.syllables;
    } else {

      while(hasValue(randWord, obj)){

        randInx = Math.floor(Math.random() * arr.length);
        randWord = arr[randInx];

        if(!hasValue(randWord, obj)){
          obj[keyName] = randWord.word;
          return randWord.syllables;
        }

      }
    }
}

function hasValue(chkVal, obj){
  var result = false;
  for (let val in obj) {
    if(obj[val] === chkVal){
      result = true;
    }
  }
  return result;
}

// controllers
router.get('/', getWords);
router.get('/temp1', getHaiku);

//export Haiku
module.exports = router;
