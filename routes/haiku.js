
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

// controllers
router.get('/', getWords);

//export Haiku
module.exports = router;
