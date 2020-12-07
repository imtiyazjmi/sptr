const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());  

// connect to database
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/sptr', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect('mongodb+srv://sptr:sptr@cluster0.xzmty.mongodb.net/sptr?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.log('Error in connectng mongoDB', err);
})
mongoose.connection.on('connected', () => {
  console.log('MongoDB Connection successful');
})

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.timeout = 60 * 1000 * 30; // 30 minutes

// Require our routes into the application.
require('./server/routes/routes')(app);

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
  console.log('Reason for Unhandled Rejection at:', reason);
});

module.exports = {
  app: app
}
