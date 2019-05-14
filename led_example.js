var gpio = require("rpi-gpio");
var repl = require('repl');
var timer = require('sleep');
var winston = require('winston');

var red = 40;
var yellow = 37;
var green = 12;

gpio.on('export', function (channel) {
	//console.log('Channel set: ' + channel);
	winston.log("info", 'Channel set: ' + channel);
});

gpio.on('change', function (channel, value) {
	winston.log("info", 'Channel ' + channel + ' value is now ' + value);
});

//gpio.setMode(gpio.MODE_BCM);

gpio.setup(green, gpio.DIR_OUT);
gpio.setup(yellow, gpio.DIR_OUT);
gpio.setup(red, gpio.DIR_OUT);

function write(pin, value) {
	gpio.write(pin, value, function (err) {
		if (err) winston.log("error", err);
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
		if (err) winston.log("error", err);

	});
}

replServer.context.help = function () {
	replServer.write("Example help =====================================");
	replServer.write("Methods:");
	replServer.write("on(color) => Turns on the LED by name (red, yellow, green)");
	replServer.write("off(color) => Turns off the LED by name (red, yellow, green)");
	replServer.write("quit() => Resets the rpi-gpio controls and releases it from memory");
	replServer.write("===> Please note that you must still type '.exit' or hit CTRL + c to fully exit the REPL environment.");
	
}
