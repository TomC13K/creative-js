const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let atoms = [];

canvas.addEventListener("mousemove", function(e) {   //  'click'   or 'mousemove'
  for (let i = 0; i < 20; i++) {
    atoms.push(new Atom(e.x, e.y));
  }
});

const animate = () => {
  atoms.forEach((atom, index) => {
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
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  requestAnimationFrame(animate);
};

animate();

class Atom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 8 + 2;
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
