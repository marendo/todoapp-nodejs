//require the just installed express app
var express = require('express');
//then we call express
var app = express();
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
//takes us to the root(/) URL
app.get('/', function (req, res) {
//when we visit the root URL express will respond with 'Hello World'
  res.send('Hello World!');
});
// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});
//the server is listening
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
module.exports = app ;
