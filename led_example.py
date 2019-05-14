import RPi.GPIO as gpio
import time

gpio.setmode(gpio.BCM)
gpio.setup(18, gpio.OUT)
gpio.setup(21, gpio.OUT)
gpio.setup(26, gpio.OUT)

while True:
    	passcode = raw_input("Enter a color of LED to light up, or type 'exit' to end: ")

	if passcode == "red":
		gpio.output(21, gpio.LOW)
		time.sleep(4)
		gpio.output(21, gpio.HIGH)
	elif passcode == "yellow":
		gpio.output(26, gpio.LOW)
		time.sleep(2)
		gpio.output(26, gpio.HIGH)
	elif passcode == "green":
		gpio.output(18, gpio.LOW)
		time.sleep(2)
		gpio.output(18, gpio.HIGH)
	elif passcode == "exit":
		gpio.cleanup()
		exit()
	else:
 		print("Wrong--try again!")

gpio.cleanup()
