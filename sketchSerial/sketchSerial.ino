#define LED_PIN 2

int recData = 0;
char uploaded = 0;

void setup(){
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
}

void download(){
  int dlData = Serial.read();
  while(dlData != '\n'){
    dlData = Serial.read();
    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
    delay(200);
  }
}

void blink(){
  for(int i = 0; i < 3*2; i++){
    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
    Serial.print(i);
    delay(600);
  }
  Serial.print('\n');
}

void loop(){
  if(recData == 'L'){
    digitalWrite(LED_PIN, HIGH);
    uploaded = 0;
  }else if(recData == 'U' && uploaded == 0){
    blink();
    uploaded = 1;
  }else if(recData == 'D' && uploaded == 1){
    download();
    uploaded = 0;
  }else{
    digitalWrite(LED_PIN, LOW);
  }
}

void serialEvent(){
  if(Serial.available() > 0){
    recData = Serial.read();
  }
}
