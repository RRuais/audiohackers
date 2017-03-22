
var express = require('./server/config/express');
var mongoose = require('./server/config/mongoose')();

var app = express();

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
