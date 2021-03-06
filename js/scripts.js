var target_objects = [], avatar, layer, text, songs = {};

var colors = ['yellow', 'blue', 'green', 'purple', 'orange']

// keep track of keys pressed
var pressed = {}

var circ_points;

// var tracks = [114736768, 114912487, 115023431, 114782237];

var test_tracks;

var velocity = 2;

var genre = 'folk'; //prompt('genre please');

var scr_width;
var scr_height;

window.onload = function() {

  scr_width = window.innerWidth;
  scr_height = window.innerHeight;
  limits = getLimits(scr_height, scr_width);

  circ_points = randomLocations(limits, colors);

  drawGame();
}

function redrawGame() {
  scr_width = window.innerWidth;
  scr_height = window.innerHeight;
  limits = getLimits(scr_height, scr_width);
  KeyboardJS.clear('up');
  KeyboardJS.clear('down');
  KeyboardJS.clear('left');
  KeyboardJS.clear('right');
  KeyboardJS.clear('space');
  alerted = false;

  circ_points = randomLocations(limits, colors);

  drawGame();
}

// function loadSounds(track_data) {
//   // play some songs in the bg
//   SC.initialize({
//     client_id: '560d601638096e37de666da699486214'
//   });

//   $.each(track_data, function(i, track) {
//     var id = track.id;
//     var title = track.title;

//     SC.stream("/tracks/" + id, {
//       volume: 0,
//       position: 5000
//     }, function(sound) {
//         console.log(title);
//         songs[title] = sound;
//         sound.play()
//     });

//   });

//   SC.whenStreamingReady(function(track_data) { 
//     drawGame(track_data); 
//     console.log('songs loaded');
//   });
// }

function drawGame(track_data) {
  // var scr_width = window.innerWidth;
  // var scr_height = window.innerHeight;
  console.log('w = ' + scr_width + ', h = ' + scr_height)

  // make stage
  var stage = new Kinetic.Stage({
    container: 'container',
    width: scr_width,
    height: scr_height
  });

  var avatar_layer = new Kinetic.Layer();

  // make layer
  layer = new Kinetic.Layer();

  // make avatar
  avatar = new Kinetic.Circle({
    x: scr_width / 2,
    y: scr_height / 2,
    radius: 20,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    velocity: velocity
  });

  // console.log("track_data = ", test_tracks)

  $.each(circ_points, function(i, track) {
    var pt = circ_points[i];
    var circle = new Kinetic.Circle({
      x: pt.x,
      y: pt.y,
      radius: 20,
      fill: pt.color,
      stroke: 'black',
      opacity: 0.1,
      strokeWidth: 4,
      // name: track.title
    });
    target_objects.push(circle);
    layer.add(circle);
  });

  
  // make text
  text = new Kinetic.Text({
    x: 10,
    y: 10,
    fontFamily: 'Helvetica',
    fontSize: 24,
    text: 'Hit an Arrow Key!',
    fill: 'black'
  });

  // add circle and text to layer
  layer.add(text);
  

  avatar_layer.add(avatar);

  // add the layer to the stage
  stage.add(layer);
  stage.add(avatar_layer);


  // ======== Key Events! ========

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

  // 'space'
  KeyboardJS.on('space',
    // key press function 
    function(e, keysPressed, keyCombo) {
      e.preventDefault();
      // prevent repeating
      if (!pressed['space']) {
        pressed['space'] = true;
        speedUp.play();
        setTimeout( function() { speedUp.reverse() }, 500);
             
      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['space']) {
        pressed['space'] = false;
      }
  });


  // ======== Moving Animations ========

  // speed up tween
  var speedUp = new Kinetic.Tween({
    node: avatar,
    velocity: 4,
    duration: .5,
    easing: Kinetic.Easings.StrongEaseOut
  });

  // var slowDown = new Kinetic.Tween({
  //   node: avatar,
  //   velocity: velocity,
  //   duration: 1,
  //   easing: Kinetic.Easings.StrongEaseOut
  // });

  var moveUp = new Kinetic.Animation(function(frame) {

    var currY = avatar.getY();
    avatar.setY(currY - avatar.getAttr('velocity'));
    checkCirclePosition();

  }, avatar_layer);

  var moveDown = new Kinetic.Animation(function(frame) {

    var currY = avatar.getY();
    avatar.setY(currY + avatar.getAttr('velocity'));
    checkCirclePosition();

  }, avatar_layer);

  var moveLeft = new Kinetic.Animation(function(frame) {

    var currX = avatar.getX();
    avatar.setX(currX - avatar.getAttr('velocity'));
    checkCirclePosition();

  }, avatar_layer);

  var moveRight = new Kinetic.Animation(function(frame) {

    var currX = avatar.getX();
    avatar.setX(currX + avatar.getAttr('velocity'));
    checkCirclePosition();

  }, avatar_layer);

}

var alerted = false;
// function for circle interactions
function checkCirclePosition() {
  var distance, volume;
  var pos = avatar.getAbsolutePosition();
  
  if (pos.x < 0 || pos.x > window.innerWidth || pos.y < 0 || pos.y > window.innerHeight ) {
    if (!alerted) {
      $('#container').html('')
      alerted = true;
      redrawGame();
      return
    }
  }

  for (i in target_objects) {
    var targObj = target_objects[i];
    var targSong = songs[targObj.getName()]
    distance = getDistanceFrom(targObj);

    if (distance <= 40) {
      text.setText('I touched the circle there!');
      // targSong.setVolume(100);
    } else if (distance <= 200) {
      // var volume_linear = -5/8 * distance + 125;
      var volume_parabolic = Math.pow((distance - 200),2) / 256;
      volume = volume_parabolic;
      targObj.setOpacity(30/distance);
      // targSong.setVolume(volume);
      text.setText('Circle Position = {x: ' + Math.round(pos.x) + ', y: ' + Math.round(pos.y) + "} Distance = " + Math.round(distance) + " Volume = " + Math.round(volume));
    } else {
      targObj.setOpacity(0.1);
      // targSong.setVolume(0);
    }
  }
  layer.draw();
}

function getDistanceFrom(target) {
  var pos = avatar.getAbsolutePosition();
  var targ_pos = target.getAbsolutePosition();
  var distance = Math.sqrt( Math.pow((pos.x - targ_pos.x), 2) + Math.pow((pos.y - targ_pos.y), 2)  );
  
  if (distance > 225) {
    // will eventually return false so we don't redraw canvas each
    return distance
  
  } else {
    // console.log("inside!")
    
    return distance;

  }
}

function randomPt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomLocations(limits, colors) {
  var circ_points = [];
  limits.splice(randomPt(0, limits.length - 1), 1);
  $.each(limits, function(i) {
    var limit = limits[i];
    var circ_point = {};
    circ_point.x = randomPt(limit.xMin,limit.xMax);
    circ_point.y = randomPt(limit.yMin,limit.yMax);
    circ_point.color = colors[i];
    circ_points.push(circ_point);
  });
  return circ_points
}

function getLimits(height, width) {
  var b = 75, //buffer
      x1 = Math.floor(width/3),
      x2 = Math.floor(width - width/3),
      y1 = Math.floor(height/2);
  return [{ //a
      xMin: b,
      xMax: x1 - b,
      yMin: b,
      yMax: y1 - b
    },
    { //b
      xMin: x1 + b,
      xMax: x2 - b,
      yMin: b,
      yMax: y1 - b
    },
    { //c
      xMin: x2 + b,
      xMax: width - b,
      yMin: b,
      yMax: y1 - b
    },
    { //d
      xMin: b,
      xMax: x1 - b,
      yMin: y1 + b,
      yMax: height - b
    },
    { //e
      xMin: x1 + b,
      xMax: x2 - b,
      yMin: y1 + b,
      yMax: height - b
    },
    { //f
      xMin: x2 + b,
      xMax: width - b,
      yMin: y1 + b,
      yMax: height - b
    }
  ]
}
