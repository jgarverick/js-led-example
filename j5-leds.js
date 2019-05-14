var five = require('johnny-five');
var gpio = require('rpi-gpio');
var board = new five.Board();

gpio.setupMode(gpio.MODE_BCM);
var red = 21;
var yellow = 26;
var green = 18;

board.on('ready', function() {
  var leds = new five.Leds([18,21,26]);
  this.on('exit', function(){
    leds[leds.indexOf(red)].off();
    leds[leds.indexOf(yellow)].off();
    leds[leds.indexOf(green)].off();
  });

  leds.pulse();

  this.repl.inject({
  on: function(color) {
  if(color == "red") {
    leds[leds.indexOf(red)].on();
  }
  },
  off: function(color) {
  
  },
  blink: function(color) {
  
  },
  exit: function() {
    board.cleanup();
  }
  });
});
