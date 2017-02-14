const mongoose = require('mongoose');

const haikuSchema = new mongoose.Schema({

  word: {
	   type: String
  },

  type: {
    type: String
  },
  
  syllables: {
    type: Number
  }

});

module.exports = haikuSchema;
