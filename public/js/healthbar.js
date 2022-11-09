var canvas = document.getElementById('canvas');
canvas.width = 300;
canvas.height = 300;
var context = canvas.getContext('2d');
var characterHealth = document.getElementById('cardHealth').innerHTML;
console.log(characterHealth);
var object1 = {
  x: 20,
  y: 30,
  width: 300,
  height: 20
};

var health = 10;
var maxHealth = 100;

// Loop
setInterval(() => onTimerTick(characterHealth), 200);

// Render Loop
function onTimerTick(health) {

  // Clear the canvas
  canvas.width = canvas.width;

  // Calculate health bar percent
  var percent = health / maxHealth;

  context.fillStyle = "Red";
  context.font = "18px sans-serif";
  // context.fillText("Life " + health + "/" + maxHealth + " = " + percent * 100 + "%", 20, 20);

  context.fillStyle = "black";
  context.fillRect(object1.x, object1.y, object1.width, object1.height);

  context.fillStyle = "red";
  context.fillRect(object1.x, object1.y, object1.width * percent, object1.height);
}

function contains(target, x, y) {
  if (x >= target.x && x <= (target.x + target.width) && y >= target.y && y <= (target.y + target.height)) {
    return true;
  }
  return false;
}

onTimerTick(characterHealth);
