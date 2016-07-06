/*jshint -W098 */
require('locus');
var util = require('util');
var EventEmitter = require('events');
util.inherits(Block, EventEmitter);

function Block(board, x = 5, y = 5, color = "#000000") {
  this.board  = board;
  this.active = true;
  this.x = x;
  this.y = y;
  this.height = 1;
  this.width = 1;
  this.color = color;

  this.canMoveRight = this.canMove.bind(this, this.blockIsAtRightSideOfBoard, this.isThereABlockOnTheRight);
  this.canMoveLeft  = this.canMove.bind(this, this.blockIsAtLeftSideOfBoard, this.isThereABlockOnTheLeft);
  this.canMoveDown  = this.canMove.bind(this, this.blockIsAtBottomOfBoard, this.isThereABlockBelow);

  this.blockIsAtBottomOfBoard    = this.isAt.bind(this.y, +1, compareGreater,this.board.rows);
  this.blockIsAtLeftSideOfBoard  = this.isAt.bind(this.x, -1, compareLess, 0);
  this.blockIsAtRightSideOfBoard = this.isAt.bind(this.x, +1, compareGreater,this.board.columns);

  this.isThereABlockOnTheRight   = this.onBottom.bind(this, +1, 0);
  this.isThereABlockOnTheLeft    = this.onBottom.bind(this, -1, 0);
  this.isThereABlockBelow        = this.onBottom.bind(this, 0, +1);

  if (this.canMoveDown)  {this.moveDown  = this.move.bind(this, 0, +1);}
  if (this.canMoveLeft)  {this.moveLeft  = this.move.bind(this, -1, 0);}
  if (this.canMoveRight) {this.moveRight = this.move.bind(this, +1, 0);}
}

Block.prototype.isAt = function(offset, comparison,board) {
  return comparison((this + offset),(board));
};

var compareLess = function(a,b) {
  return a < b;
};

var compareGreater = function(a,b) {
  return a > b;
};

Block.prototype.draw = function(context) {
  context.lineWidth  = '0.5';
  context.fillStyle = this.color;
  context.strokeRect(this.x * 25, this.y * 25, 25, 25);
  context.fillRect(this.x * 25, this.y * 25, 25, 25);
};

Block.prototype.move = function (xOffset, yOffset) {
  this.x += xOffset;
  this.y += yOffset;
  return this;
};

Block.prototype.onBottom = function ( xOffset, yOffset){
  if (this.board.findBlockOnBoard(this.x + xOffset, this.y + yOffset)) { return true; }
};

Block.prototype.inactive = function() {
  return this.active = false;
};

Block.prototype.canMove = function(blockIsAt, isThereA){
  if (this.inactive) { return this.active = false; }
  if (this.blockisAt) { return this.inactive; }
  if (this.isThereA) { return false; }
};

module.exports = Block;
