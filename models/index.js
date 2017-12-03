const mongoose = require('mongoose');


mongoose.set('debug', true);
mongoose.Promise = global.Promise;
// Set mongodb
mongoose.connect('mongodb://localhost/todo-api', {
  useMongoClient: true
})
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log(err);
  });



module.exports.Todo = require('./todo');

