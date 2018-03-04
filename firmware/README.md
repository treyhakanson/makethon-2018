# ESP 8285 (ESP 8266) Notes

## Notes

Don't try to do this on Mac OS. Long and short of it, you need to disable kext signing and download a ton of drivers and firmware. It's not worth it.

## Links

[Setup](http://www.instructables.com/id/Getting-Started-With-ESP8266LiLon-NodeMCU-V3Flashi/)

## Setup

This product suffers from a severe lack of documentation. After days of fiddling I have finally gotten it to work with the Arduino environment. To help those who are having problems, here are the steps necessary to make it work with the Arduino programming environment.

1. Download the latest Arduino environment (use Google). I am using 1.8.3 on Windows 7.
2. Follow the guide on sparkfun regarding installing the 8266 in the arduino environment. Google "sparkfun installing 8266 guide" and it should be the top link.
3. You must also have the Silicon Labs CP210x USB to UART Bridge driver installed (probably need to reboot). It is available for most major OS's. Use Google to find the driver. Verify that (in windows) your Device Manager lists this driver in the PORTS part of the tree. It will also show your COM port for your ESP8266 next to it. If it doesn't show, then nothing else will work.
4. Now in the Tools menu you will need to setup for your board. Everything after this is under the Tools menu in the Arduino environment.
   Set Board -> Generic ESP8266 Module
   Set Flash Mode -> DOUT
   Leave Upload Speed -> 115200
5. Hold the flash button on the board while uploading the code from the Arduino environment. I suggest the back side of a pencil since you will be holding it a while.
6. Click reset on the board to start the program.

Here is a sample blink program I know works and blinks the blue LED on the board its self. One last tip, the labels for the pins are correct on the bottom of the board, but oddly the top of the board does not seem to map correctly (might be me not understanding why D0 is supposed to equal GPIO16). So GPIO0 on the bottom is actuated by digitalWrite(0,HIGH) in the code.

int PIN = 2;

void setup() {
pinMode(PIN, OUTPUT);
digitalWrite(PIN, LOW);
}

void loop() {
digitalWrite(PIN, HIGH);
delay(1000);
digitalWrite(PIN, LOW);
delay(1000);
}
