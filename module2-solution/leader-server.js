var mongoose = require('mongoose'),
    assert = require('assert');

var Leadership = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    Leadership.create({
      name: "Peter Pan",
      image: "images/alberto.png",
      designation: "Chief Epicurious Officer",
      abbr: "CEO",
      description: "Our CEO, Peter, . . ."
    }, function (err, leader) {
      if (err) throw err;
      console.log("Leader created");
      console.log(leader);

      var id = leader._id;

      setTimeout(function() {
        Leadership.findByIdAndUpdate(id, {
            $set: {
                description: 'Updated Test'
              }
          }, {
            new: true
          })
          .exec(function (err, leader) {
            if (err) throw err;
            console.log("Updated leader");
            console.log(leader);

            leader.save(function(err, leader) {
              console.log('Updated Comments!');
              console.log(leader);

              db.collection('dishes').drop(function () {
                  db.close();
              });
            });
          });
      }, 3000);
    });
});
