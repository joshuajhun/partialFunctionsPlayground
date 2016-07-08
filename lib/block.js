var util = require('util');
var EventEmitter = require('events');
util.inherits(Block, EventEmitter);

function Block(board, x = 0, y = 0) {
  this.board = board;
  this.x = x;
  this.y = y;
  this.active = true;
};

Block.prototype.inactive = function() {
  return this.active = false;
};

// check the position of the block on the board difficulty #spicy / medium

Block.prototype.blockIsAtBottomOfBoard = function() {
  return this.y + 1 > this.board.rows;
};

Block.prototype.blockIsAtLeftSideOfBoard = function() {
  return this.x - 1 < this.board.columns;
};

Block.prototype.blockIsAtRightSideOfBoard = function() {
  return this.x + 1 > this.board.columns;
};

//

// can check whether their is a block to the right/left/belown #spicy

Block.prototype.isThereABlockOnTheRight = function() {
  if (this.board.findBlockOnBoard(this.x + 1, this.y)) { return true }
};

Block.prototype.isThereABlockOnTheLeft = function() {
  if (this.board.findBlockOnBoard(this.x - 1, this.y)) { return true }
};

Block.prototype.isThereABlockBelow = function() {
  if (this.board.findBlockOnBoard(this.x, this.y + 1)) { return true }
};

//

// check whether the block can move left, right, or down on board difficulty #medium

Block.prototype.canMoveDown = function() {
  if (this.inactive){ return this.active = false }

  // check conditionals below to confirm falling block moves correctly

  if (this.blockIsAtBottomOfBoard){ return this.inactive }

  if (this.isThereABlockBelow) { return false }
};

Block.prototype.canMoveLeft = function(){

  if (this.inactive) { return this.active = false}

  // check conditionals below to confirm falling block moves correctly

  if (this.blockIsAtLeftSideOfBoard) {return this.inactive}

  if (this.isThereABlockOnTheLeft) { return false }
};

Block.prototype.canMoveRight = function(){

  if (this.inactive) { return this.active = false }

  // check conditionals below to confirm falling block moves correctly

  if (this.blockIsAtRightSideOfBoard) { return this.inactive }

  if (this.isThereABlockOnTheRight) { return false }
};

// move block on board if it meets conditionals [done in class]

Block.prototype.moveDown = function() {
  if (this.canMoveDown) { this.y++ };
  return this;
};

Block.prototype.moveRight = function() {
  if (this.canMoveRight) { this.x++ };
  return this;
};

Block.prototype.moveLeft = function() {
  if (this.canMoveLeft) { this.x-- };
  return this;
};

module.exports = Block;
