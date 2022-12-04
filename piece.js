// create tetrominos piece 
class Piece { 
  constructor(ctx) {  
    let random = Math.floor(Math.random()*SHAPES.length);
    this.shape = SHAPES[random];
    this.color = COLORS[random]
    this.ctx = ctx;
    // starting position of piece
    this.x = 3;
    this.y = 0; 
  }

  // create function to draw tetrominos piece on the board
  draw() {
    // fill color of tetromino with fillStyle()
    this.ctx.fillStyle = this.color;
    // loop through all the cells of the shape
    this.shape.forEach((row, y) => {
      // this.x, this.y gives the left upper position of the shape
      // x, y gives the position of the block in the shape
      // this.x + x is then the position of the block on the board
      // color that block when the value in the cell is greater than 0
      row.forEach((value, x) => {
        if (value > 0) {
          // use fillRect(x, y, width, height) to draw simple rectangle
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  // function move to update new position of x,y of piece
  move(p) {  // define piece as p
    this.x = p.x;  
    this.y = p.y;
    this.shape = p.shape;
  }
}