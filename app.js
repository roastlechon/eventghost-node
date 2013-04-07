var net = require('net');
var md5 = require('MD5');
var string = require('string');

var eventGhost = {
	port : 1024,
	host : "192.168.1.121",
	password : "1234"
}

var sendCommand = function(command) {
	var connection = net.connect(
		{
			port: eventGhost.port,
			host: eventGhost.host,
			allowHalfOpen: true
		}, function() {
			console.log("connection established");
			// write to stream
			connection.write("quintessence\n\r");
	});

	connection.on('data', function(data) {
		e = string(data).trim().s;
		if (e === "accept") {
			console.log("sending command");
			connection.write(command + "\n");
			connection.write("close\n");
			connection.end();
		} else {
			console.log("socket output: " + e);
			e = e + ":" + eventGhost.password;
			e = md5(e);
			console.log("sending hash");
			connection.write(e + "\n");
		}
	});

	connection.on('end', function(){
		console.log("connection ended");
	});
}

sendCommand("test");