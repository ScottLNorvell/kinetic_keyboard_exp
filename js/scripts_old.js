var scr_width = window.innerWidth;
var scr_height = window.innerHeight;

// make stage
var stage = new Kinetic.Stage({
  container: 'container',
  width: scr_width,
  height: scr_height
});

// make layer
var layer = new Kinetic.Layer();
var play_layer = new Kinetic.Layer();

// make circle
var circle = new Kinetic.Circle({
  x: scr_width / 2,
  y: scr_height / 2,
  radius: 20,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

var targetCircle = new Kinetic.Circle({
  x: 100,
  y: 100,
  radius: 20,
  fill: 'blue',
  stroke: 'black',
  opacity: 0.1,
  strokeWidth: 4
});

var targetCircle2 = new Kinetic.Circle({
  x: scr_width - 100,
  y: 100,
  radius: 20,
  fill: 'green',
  stroke: 'black',
  opacity: 0.1,
  strokeWidth: 4
});

var targetCircle3 = new Kinetic.Circle({
  x: scr_width - 300,
  y: 500,
  radius: 20,
  fill: 'purple',
  stroke: 'black',
  opacity: 0.1,
  strokeWidth: 4
});

var targetCircle4 = new Kinetic.Circle({
  x: 300,
  y: 500,
  radius: 20,
  fill: 'yellow',
  stroke: 'black',
  opacity: 0.1,
  strokeWidth: 4
});

// array of target circle points (eventually returned from function that makes circles)
// var target_points = [ {x: 100, y: 100}, {x:500, y:300} ]

// make text
var text = new Kinetic.Text({
  x: 10,
  y: 10,
  fontFamily: 'Helvetica',
  fontSize: 24,
  text: 'Hit an Arrow Key!',
  fill: 'black'
});

// add circle and text to layer
layer.add(text);
play_layer.add(circle);
layer.add(targetCircle);
layer.add(targetCircle2);
layer.add(targetCircle3);
layer.add(targetCircle4);

// add the layer to the stage
stage.add(layer);
stage.add(play_layer);


// ======== Key Events! ========

// keep track of keys pressed
var pressed = {}

// 'up'
KeyboardJS.on('up',
  // key press function 
  function(e, keysPressed, keyCombo) {
    e.preventDefault();
    // prevent repeating
    if (!pressed['up']) {
      pressed['up'] = true;
      moveDown.stop();
      moveUp.start();      
    }
  },
  // key release function 
  function(e, keysPressed, keyCombo) { 
    if (pressed['up']) {
      pressed['up'] = false;
      moveUp.stop(); 
    }
});

// 'down'
KeyboardJS.on('down',
  // key press function 
  function(e, keysPressed, keyCombo) {
    e.preventDefault();
    // prevent repeating
    if (!pressed['down']) {
      pressed['down'] = true;
      moveUp.stop();
      moveDown.start();      
    }
  },
  // key release function 
  function(e, keysPressed, keyCombo) { 
    if (pressed['down']) {
      pressed['down'] = false;
      moveDown.stop(); 
    }
});

// 'left'
KeyboardJS.on('left',
  // key press function 
  function(e, keysPressed, keyCombo) {
    e.preventDefault();
    // prevent repeating
    if (!pressed['left']) {
      pressed['left'] = true;
      moveRight.stop();
      moveLeft.start();

    }
  },
  // key release function 
  function(e, keysPressed, keyCombo) { 
    if (pressed['left']) {
      pressed['left'] = false;
      moveLeft.stop(); 
    }
});

// 'right'
KeyboardJS.on('right',
  // key press function 
  function(e, keysPressed, keyCombo) {
    e.preventDefault();
    // prevent repeating
    if (!pressed['right']) {
      pressed['right'] = true;
      moveLeft.stop();
      moveRight.start();      
    }
  },
  // key release function 
  function(e, keysPressed, keyCombo) { 
    if (pressed['right']) {
      pressed['right'] = false;
      moveRight.stop(); 
    }
});


// ======== Moving Animations ========

var velocity = 2;

var moveUp = new Kinetic.Animation(function(frame) {

  var currY = circle.getY();
  circle.setY(currY - velocity)
  checkCirclePosition();

}, play_layer);

var moveDown = new Kinetic.Animation(function(frame) {

  var currY = circle.getY();
  circle.setY(currY + velocity)
  checkCirclePosition();

}, play_layer);

var moveLeft = new Kinetic.Animation(function(frame) {

  var currX = circle.getX();
  circle.setX(currX - velocity)
  checkCirclePosition();

}, play_layer);

var moveRight = new Kinetic.Animation(function(frame) {

  var currX = circle.getX();
  circle.setX(currX + velocity)
  checkCirclePosition();

}, play_layer);

var target_objects = [targetCircle, targetCircle2, targetCircle3, targetCircle4]

// function for circle interactions
function checkCirclePosition() {
  var distance;
  var pos = circle.getAbsolutePosition();
  

  for (i in target_objects) {
    distance = getDistanceFrom(target_objects[i]);

    if (distance <= 40) {
      text.setText('I touched the circle there!');
    } else if (distance <= 200) {
      target_objects[i].setOpacity(30/distance);
      text.setText('Circle Position = {x: ' + pos.x + ', y: ' + pos.y + "} Distance = " + Math.round(distance));
    } else {
      target_objects[i].setOpacity(0.1);
    }
  }
  layer.draw();
}

function getDistanceFrom(target) {
  var pos = circle.getAbsolutePosition();
  var targ_pos = target.getAbsolutePosition();
  var distance = Math.sqrt( Math.pow((pos.x - targ_pos.x), 2) + Math.pow((pos.y - targ_pos.y), 2)  );
  return distance;
}






















// example of moving left and up!
// var amplitude = 75;
// var period = 1000;
// // in ms
// var centerX = stage.getWidth() / 2;
// var centerY = stage.getHeight() / 2;

// var anim = new Kinetic.Animation(function(frame) {
//   hexagon.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
//   hexagon.setY(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerY);
  
// }, layer);

// anim.start();