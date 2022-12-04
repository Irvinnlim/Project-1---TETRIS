class Board {
  // create function to set a new board when new game starts
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();
    this.piece = new Piece(ctx);
  }

  // get board of 2D array (20 rows by 10 columns) filled with 0
  getEmptyBoard() {
    return Array.from(
      {length: ROWS}, () => Array(COLUMNS).fill(0)
    );
  }

  // create function to rotate tetromino piece when 'up' key is pressed
  rotate(piece) {  
    // Clone with JSON
    let p = JSON.parse(JSON.stringify(piece));  
    
    // Transpose matrix of piece
    for (let y = 0; y < p.shape.length; y++) {  
      for (let x = 0; x < y; x++) {  
        [p.shape[x][y], p.shape[y][x]] =   
        [p.shape[y][x], p.shape[x][y]];  
      }  
    }
 
    // reverse the order of columns 
    p.shape.forEach(row => row.reverse());
 
    return p;  
  }
  
  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return value === 0 || (this.isInsideBoard(x, y) && this.isNotOccupied(x, y));
      });
    });
  }

  isNotOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }
    
  // check boundaries
  // x position of tetromino greater than x position of left wall
  // x position of tetromino less than x position of right wall
  // y position of square greater than y position of floor
  isInsideBoard(x, y) {
    return (
      x >= 0 && 
      x < COLUMNS && 
      y < ROWS 
    );
  }

  // create function to move tetromino piece down until bottom of board
  drop() {
    let p = moves[KEY.DOWN](this.piece);
    
    if (this.valid(p)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.piece = new Piece(this.ctx);
    } 
  }

  freeze() {  
    this.piece.shape.forEach((row, y) => {  
      row.forEach((value, x) => {  
        if (value > 0) {  
          this.grid[y + this.piece.y][x + this.piece.x] = value;  
        }  
      });  
   });  
  }

  draw() {  
    this.grid.forEach((row, y) => {  
      row.forEach((value, x) => {  
        if (value > 0) {  
          this.ctx.fillStyle = GREYSCALE[0];  
          this.ctx.fillRect(x, y, 1, 1);  
        }  
      });  
    });  
  }
}