/*

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log(interfaces);
*/

var express = require('express');
var app = express();

app.set('port',(process.env.PORT || 5000));

app.get('/',function(req,res){
  //var ip = req.headers['x-forwarded-for'];

  var ip;
  var lang;
  var user;


  var ipaddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
  if(ipaddress){
    console.log(req.ip);
    ip = ipaddress;
  }
  lang = req.headers['accept-language'].split(",")[0];
  user = req.headers['user-agent'].match(/\((.*?)\)/)[1];
  console.log(req.headers['accept-language'].split(",")[0]);
  console.log(req.headers['user-agent'].match(/\((.*?)\)/)[1]);

  var parseObj = {
    "ipaddress":ip,
    "language":lang,
    "software":user
  };
  res.send(JSON.stringify(parseObj));
});

var server = app.listen(app.get('port'),function(){
  var host = server.address().address
  var port = server.address().port
  console.log(host + " "+ port)
});
