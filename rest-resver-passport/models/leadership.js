// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var leadershipSchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  image: {
      type: String,
      required: true,
  },
  designation: {
      type: String,
      required: true,
  },
  abbr: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  }
});

var Lidership = mongoose.model('Lidership', leadershipSchema);

module.exports = Lidership;
