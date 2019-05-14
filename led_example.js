var gpio = require("rpi-gpio");
var repl = require('repl');
var timer = require('sleep');
var red = 40;
var yellow = 37;
var green = 12;

gpio.on('export', function (channel) {
	console.log('Channel set: ' + channel);
});

gpio.on('change', function (channel, value) {
	console.log('Channel ' + channel + ' value is now ' + value);
});

//gpio.setMode(gpio.MODE_BCM);

gpio.setup(green, gpio.DIR_OUT);
gpio.setup(yellow, gpio.DIR_OUT);
gpio.setup(red, gpio.DIR_OUT);

function write(pin, value) {
	gpio.write(pin, value, function (err) {
		if (err) console.log(err);
	});
}

var replServer = repl.start({
	prompt: "LED Example > ",

});

replServer.context.green = green;
replServer.context.yellow = yellow;
replServer.context.red = red;

replServer.context.on = function (color) {
	write(color, true);
}

replServer.context.off = function (color) {
	write(color, false);
}
/*
replServer.context.blink = function (color, duration, times) {
	var isOn = false;
	if (times == null) times = 4;
	if (duration == null) duration = 1;
	for (var i = 0; i < times; i++) {
		isOn = !isOn;
                console.log("Current LED state: " + isOn);
		write(color, isOn);
		timer.sleep(duration);
	}
}
*/
replServer.context.quit = function () {
	gpio.reset();
	gpio.destroy(function (err) {
		if (err) console.log(err);
		
	});
}
