const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// calculate size of canvas from constants
ctx.canvas.width = COLUMNS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let requestId = null;

let board = new Board(ctx);

// create function to move tetromino piece when key is pressed
function handleKeyPress(event) {
  // stop the event from bubbling 
  event.preventDefault();
  // check if key pressed is registered as our moves  
  if (moves[event.keyCode]) {
    // get new state of piece
    let p = moves[event.keyCode](board.piece);

    if (board.valid(p)) { // move the piece if the move is does not collide with the boundary
      board.piece.move(p);
    }
  }
}

// create function to listen for 'keydown' event when key is pressed
function addEventListener() {
  document.removeEventListener('keydown', handleKeyPress); // remove event listener when done
  document.addEventListener('keydown', handleKeyPress); // after handling event, listen for new 'keydown event
}

function draw() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear previous drawing before drawing to new position 
 
  board.draw();
  board.piece.draw();
}
 
function play() {
  board = new Board(ctx); // resets board when new game starts
  addEventListener();

  // cancel animation if game is running
  if (requestId) {
    cancelAnimationFrame(requestId);
  }
  time.start = performance.now(); // returns time in miliseconds
  animate();
}

let time = { start: 0, elapsed: 0, level: 1000 };

function animate(now = 0) {
  // update elapsed time
  time.elapsed = now - time.start;
  // ff elapsed time has passed time for current level
  if (time.elapsed > time.level) {
    // restart counting from now
    time.start = now;

    board.drop();
  }

  draw();
  requestId = requestAnimationFrame(animate); // use requestAnimationFrame as it enables browser optimisation, handles frame rate
}