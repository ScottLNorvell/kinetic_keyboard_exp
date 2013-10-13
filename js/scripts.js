var scr_width = window.screen.width
var scr_height = window.screen.height

// make stage
var stage = new Kinetic.Stage({
  container: 'container',
  width: scr_width,
  height: scr_height
});

// make layer
var layer = new Kinetic.Layer();

// make circle
var circle = new Kinetic.Circle({
  x: 350,
  y: 100,
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
layer.add(circle);
layer.add(targetCircle)

// add the layer to the stage
stage.add(layer);


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

}, layer);

var moveDown = new Kinetic.Animation(function(frame) {

  var currY = circle.getY();
  circle.setY(currY + velocity)
  checkCirclePosition();

}, layer);

var moveLeft = new Kinetic.Animation(function(frame) {

  var currX = circle.getX();
  circle.setX(currX - velocity)
  checkCirclePosition();

}, layer);

var moveRight = new Kinetic.Animation(function(frame) {

  var currX = circle.getX();
  circle.setX(currX + velocity)
  checkCirclePosition();

}, layer);

// function for 
function checkCirclePosition() {
  
  
  var distance = getDistanceFrom(targetCircle);
  // check dist from target and update opacity accordingly

  if (distance <= 200) {
    targetCircle.setOpacity(30/distance);
  } else {
    targetCircle.setOpacity(0.1);
  }


  // for debugging
  var pos = circle.getAbsolutePosition();
  text.setText('Circle Position = {x: ' + pos.x + ', y: ' + pos.y + "} Distance = " + distance);

  // redraw layer when done. Possibly move to conditional
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