#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#include <string.h>

#define LED_PIN 0
#define CDS_PIN 17 // ADC
#define MOTOR_L_PIN 14
#define MOTOR_R_PIN 12
#define BUMP_SWITCH_PIN 5

const char *ssid = "wilber-phone";
const char *password = "deep_sea_tuna";

short unsigned hit_count = 0;
short unsigned hitpoints = 2;
short unsigned dead = 0;

char d0[25], d1[25], d2[25];

void setup() {
  String payload;
  int http_code;
  StaticJsonBuffer<300> JSONBuffer;
  
  Serial.begin(115200);
  Serial.println();

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH);

  Serial.println("Attempting to connect to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    ESP.wdtFeed();
    Serial.println("Connecting...");
    delay(500);  
  }
  Serial.println("Connected!");

  Serial.println("Attempting to make an HTTP request");
  HTTPClient http;
  http.begin("http://154c2b90.ngrok.io/mcu/bot/0/0");
  http_code = http.GET();

  if (http_code > 0) {
    payload = http.getString();
    Serial.print("Success! HTTP Result: ");
    Serial.println(payload);
    
    JsonObject &parsed = JSONBuffer.parseObject(payload);

    Serial.printf("Parsing successful: %d\n", parsed.success());
    
    strcpy(d0, parsed["priority0"]);
    strcpy(d1, parsed["priority1"]);
    strcpy(d2, parsed["priority2"]);

    Serial.printf("Priority 1: %s\n", d0);
    Serial.printf("Priority 2: %s\n", d1);
    Serial.printf("Priority 3: %s\n", d2);
  } else {
    payload = http.errorToString(http_code);
    Serial.print("Failure. Error: ");
    Serial.println(payload);
  }

  http.end();
  Serial.println("Request Successful Complete");

  pinMode(MOTOR_L_PIN, OUTPUT);
  pinMode(MOTOR_R_PIN, OUTPUT);

  delay(1000);
  Serial.println("Setup Complete.");  
}

void _delay(int ms) {
  int i, interval = 100;
  
  for (i = 0; i < ms; i += interval) {
    if (!dead) {
      watch_for_damage();
    }
    delay(interval);  
  }
}

void loop() {
  _delay(150);
  if (!dead) {
    execute_directives();
  }
}

void execute_directives() {
  read_cds_value();
  execute_directive(d0);
  execute_directive(d1);
  execute_directive(d2);
}

void execute_directive(char *d) {
  Serial.printf("Performing directive %s\n", d);
  if (!strcmp("move", d)) {
    Serial.printf("\tMOVE\n");
    forward();  
  } else if (!strcmp("left", d)) {
    Serial.printf("\tLEFT\n");
    left();
  } else if (!strcmp("right", d)) {
    Serial.printf("\tRIGHT\n");
    right(); 
  } else if (!strcmp("stop", d)) {
    Serial.printf("\tSTOP\n");
    halt();
    _delay(1000);
  }
}

void motor_l(int state) {
  digitalWrite(MOTOR_L_PIN, state);
}

void motor_r(int state) {
  digitalWrite(MOTOR_R_PIN, state);
}

void halt() {
  motor_l(LOW);
  motor_r(LOW);
}

void forward() {
  motor_l(HIGH);
  motor_r(HIGH);
  _delay(1000);
  halt();
}

void right() {
  motor_l(HIGH);
  motor_r(LOW);
  _delay(1000);
  halt();
}

void left() {
  motor_l(LOW);
  motor_r(HIGH);
  _delay(1000);
  halt();  
}

void read_cds_value() {
  int v = analogRead(CDS_PIN);
  Serial.printf("CDS Cell: %d\n", v);
}

void watch_for_damage() {
  if (digitalRead(BUMP_SWITCH_PIN) == HIGH && ++hit_count >= hitpoints) {
      digitalWrite(LED_PIN, LOW);
      dead = 1;
      Serial.println("Bot out of commission.");
  }  
}



