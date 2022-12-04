// create 10 columns and 20 rows with each block size 30px
const COLUMNS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const SHAPES = [
  [
  [0, 0, 0, 0], // iTetromino
  [1, 1, 1, 1], 
  [0, 0, 0, 0], 
  [0, 0, 0, 0]
  ],
  [
  [2, 0, 0], // jTetromino
  [2, 2, 2], 
  [0, 0, 0]
  ],

  [
  [0, 0, 3], // lTetromino 
  [3, 3, 3], 
  [0, 0, 0]
  ],

  [
  [4, 4], // oTetromino 
  [4, 4]
  ],
      
  [
  [0, 5, 5], // sTetromino
  [5, 5, 0], 
  [0, 0, 0]
  ],

  [
  [0, 6, 0], // tTetromino
  [6, 6, 6], 
  [0, 0, 0]
  ],

  [
  [7, 7, 0], // zTetromino
  [0, 7, 7], 
  [0, 0, 0]
  ]
];

// set corresponding colors of tetromino
const COLORS = [
  '#00FFFF',
  '#0000FF',
  '#FFA500',
  '#FFFF00',
  '#00FF00',
  '#A020F0',
  '#FF0000'
];

// set block colors to grey when fixed
const GREYSCALE =[
  '#808080'
];

// set arrow keys
const KEY = { 
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}; 

// set key movements
const moves = {
  [KEY.LEFT]:  (p) => ({ ...p, x: p.x - 1 }),  
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),  
  [KEY.DOWN]:  (p) => ({ ...p, y: p.y + 1 }),
  [KEY.UP]:    (p) => board.rotate(p),
};