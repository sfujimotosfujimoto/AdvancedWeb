const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// TODOROUTES
const todoRoutes = require('./routes/todos');

// BODY Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// STATIC FILES
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

// ROOT ROUTE
app.get('/', function (req, res) {
  res.sendFile("index.html");
});


// TODOS ROUTES
app.use('/api/todos', todoRoutes);



// PORT SETUP
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("APP IS RUNNING ON PORT " + port);
});

