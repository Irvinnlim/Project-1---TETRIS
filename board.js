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
  
  // create function to check tetromino piece move is valid
  valid(p) {
    // check every row and value of the grid
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx; // x coordinate of board grid
        let y = p.y + dy; // y coordinate of board grid
        // value = 0 is valid square or next grid move tetromino is inside the board and the grid is not occupied
        return value === 0 || (this.isInsideBoard(x, y) && this.isNotOccupied(x, y));
      });
    });
  }

  // create function to check if board grid is occupied
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
      this.freeze(); // merge piece to board if it has no more valid moves
      this.clearLines(); // clear row if piece fixed and row is filled
      if ( this.piece.y === 0) { // check if piece is on row zero when tetromino piece is freezed, if so GAME OVER
        return false;
      }
      this.piece = new Piece(this.ctx);
    }
    return true; 
  }

  // create function to merge tetromino piece to the board when it has no more down moves
  freeze() {  
    this.piece.shape.forEach((row, y) => {  
      row.forEach((value, x) => {  
        if (value > 0) {  
          this.grid[y + this.piece.y][x + this.piece.x] = value;  
        }  
      });  
   });  
  }

  // create function to draw when tetromino piece is fixed onto the board, change color to grey
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

  // create function to clear line when row is filled
  clearLines() {
    let lines = 0;
    this.grid.forEach((row,y) => {
      // check for full row if every value is greater zero
      if (row.every(value => value > 0)) {
        // increase for cleared line
        lines++; 
        // if row is full, remove the row
        this.grid.splice(y, 1);
        // add zero-filled row at the top
        this.grid.unshift(Array(COLUMNS).fill(0));
      };
    });
    if (lines > 0) {
      // aadd points if lines cleared
      account.score += this.lineClearPoints(lines);
      account.lines += lines;
    }

  }

  // create function to award points for cleared lines
  lineClearPoints(lines) {
    return lines === 1 ? POINTS.SINGLE :
           lines === 2 ? POINTS.DOUBLE :
           lines === 3 ? POINTS.TRIPLE :
           lines === 4 ? POINTS.TETRIS :
           0;
  }
}