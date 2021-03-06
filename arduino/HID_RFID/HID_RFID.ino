volatile unsigned long tagID = 0;
volatile unsigned long lastBitArrivalTime;
volatile int bitCount = 0;

void ISRone(void)
{ 
  lastBitArrivalTime = millis();
  bitCount++;
  tagID <<= 1;
  tagID |= 1;
}

void ISRzero(void)
{
  lastBitArrivalTime = millis();
  bitCount++;
  tagID <<= 1;
}

void setup()
{
  Serial.begin(9600);

  pinMode(2, INPUT);
  digitalWrite(2, HIGH);  // Enable pull-up resistor
  attachInterrupt(0, ISRzero, FALLING);

  pinMode(3, INPUT);
  digitalWrite(3, HIGH);  // Enable pull-up resistor
  attachInterrupt(1, ISRone,  FALLING);

  tagID = 0;
  bitCount = 0;
}

void loop()
{
  //  See if it has been more than 1/4 second since the last bit arrived
  if(bitCount > 0 && millis() - lastBitArrivalTime >  250){

    Serial.print("$");
    Serial.print(tagID,DEC);
    Serial.print("*");
    tagID = 0;
    bitCount = 0;
  }
}
