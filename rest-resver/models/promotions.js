// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionsSchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  image: {
      type: String,
      required: true,
  },
  label: {
      type: String,
      required: true,
  },
  price: {
    type: Currency,
    required: true,
  },
  description: {
    type: String,
    required: true
  }
});

var Promotions = mongoose.model('Promotion', promotionsSchema);

module.exports = Promotions;
