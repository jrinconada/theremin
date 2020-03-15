let notes = ["B4","A#4","A4","G#4","G4","F#4","F4","E4","D#4","D4","C#4","C4","B3","A#3","A3","G#3","G3","F#3","F3","E3","D#3","D3","C#3","C3","B2","A#2","A2","G#2"];

let frequencies = [493.8833, 466.1638, 440.0, 415.3047, 391.9954, 369.9944, 349.2282, 329.6276, 311.127, 293.6648, 277.1826, 261.6256, 246.9417, 233.0819, 220.0, 207.6523, 195.9977, 184.9972, 174.6141, 164.8138, 155.5635, 146.8324, 138.5913, 130.8128, 123.4708, 116.5409, 110.0, 103.8262 ];

let osc, playing, freq, amp, db;
let fixedColor = 200;
let changingColor = 200;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
}

function draw() {
  background(60)
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  db = 20 * log10(amp / 0.0002);
  
  changeColor();
  
  showWave(150, width / 3, freq, amp);

  showText();

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

function playOscillator() {
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}

function showText() {
  fill(fixedColor);
  var x = 25;
  var y = height / 3;
  let margin = 50;
  
  textSize(20);
  text('Frecuencia', x, y);
  text('Nota', x, y += margin);
  text('Amplitud', x, y += margin);
  text('Volumen', x, y += margin);
  
  x = 165;
  y = height / 3;
  textSize(25);
  text(floor(freq) + ' Hz', x, y);
  text(getNote(freq), x, y += margin);
  text(floor(map(amp, 0, 1, 0, 100)) + ' %', x, y += margin);
  text(floor(db) + ' dB', x, y += margin);
  
  fill(changingColor);
  textSize(30);
  text('Theremín', width / 2.8, 60);
  fill(fixedColor);
  textSize(25);
  text('- - -  Tono   - - - ', width / 3, height - 30);
  rotate(-HALF_PI);
  text('- - -  Volumen   - - -', -height / 1.3, width - 30);
}

function log10(x) {
  return (log(x) / log(10));
}

function showWave(posX, posY, frequency, amplitude) {
  let points = 3000;
  let sizeX = 0.00005;
  let sizeY = 100;
  let length = width / 1.6;
  stroke(changingColor);
  strokeWeight(4);
  
  
  for (x = 0; x < points; x++) {
    y = sin(x * frequency * sizeX) * amplitude * sizeY;
    point(posX + map(x,0, points, posX, length), posY + y);
  }
  noStroke();
}

function getNote(frequency) {
  var note = ''
  for (i = 0; i < frequencies.length; i++) {
    if(frequency >= frequencies[i]) {
      return notes[i];
    }
  }
  return '-';
}

function changeColor() {
  colorMode(HSB);
  changingColor = color(map(freq, 100, 500, 0, 255), 70, map(amp, 0, 1, 30, 100));
  colorMode(RGB);
}