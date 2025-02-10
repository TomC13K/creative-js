const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let atoms = [];

// canvas.addEventListener("mousemove", function(e) {   //  'click'   or 'mousemove'
//   for (let i = 0; i < 20; i++) {
//     atoms.push(new Atom(e.x, e.y));
//   }
// });

const animate = () => {
  atoms.forEach((atom, index) => {
    ctx.fillStyle = 'white';
    atom.draw();
    atom.updateSpeed();
    atom.updateSize();

    // if attom size gets too small - remove atom from the list
    if(atom.radius < 0.3) {
        atoms.splice(index, 1);    // from index remove 1 item
    }
  });
  // redraw the canvas on each update n make the move more transparent by 0.2
  ctx.save();
  //ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  requestAnimationFrame(animate);
};

animate();

class Atom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 2;
    this.speedX = Math.random() * 4 - 2; // -2  +2
    this.speedY = Math.random() * 4 - 2; // -2  +2
  }

  // for pperformance lets limit the length/ time odf the rays 
  updateSpeed() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  updateSize() {
    this.radius -= 0.1;
  }

  // draw circle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// if values x,y are 0 - it will sparkle in the middle of the screen
const point = {
  x: 0,      //canvas.width / 2,
  y: 0       //canvas.height /2
}

//generate atoms, without mouse event, across all canvas/screen

let degree = 0;
const generateAtoms = () => {
  atoms.push(new Atom(
    canvas.width/2 + (point.x * 200), 
    canvas.height/2 + (point.y * 200)
  ));
  // here can move point coordinations for next update to create a movement
  point.x = Math.cos(degree /180 * Math.PI);    //move - left, right
  point.y = point.x * point.x;                  //move up down - hyperbolic
  
  degree++;
  requestAnimationFrame(generateAtoms);
}

generateAtoms();
