var util = require('util');
var EventEmitter = require('events');
util.inherits(Board, EventEmitter);
var _ = require('lodash');


function Board(columns = 10, rows = 20) {
  this.columns        = columns;
  this.rows           = rows;
  this.pieces         = [];
  this.blocks         = [];
  this.score          = 0;
  this.rowBlockCount  = { 1: 0, 2: 0, 3: 0,
                          4: 0, 5: 0, 6: 0,
                          7: 0, 8: 0, 9: 0,
                          10: 0, 11: 0, 12: 0,
                          13: 0, 14: 0, 15: 0,
                          16: 0, 17: 0, 18: 0,
                          19: 0, 20: 0
                        };
}

Board.prototype.draw = function (context) {
  _.each(this.pieces, function(piece){
    piece.draw(context);
  });
};

Board.prototype.generateShape = function() {
  var shape =  _.sample(shapes);
  var randoShape = new shape(this);
  var currentShape = new Shape(randoShape);
  return this.addBlockToBoard(currentShape);
};

Board.prototype.generate = function(context) {
  context.fillRect(this.rows, this.columns, this.pieces);
  _.each(this.pieces, function(block){
    context.fillRect(block.x, block.y, 5, 5);
  });
};

Board.prototype.addBlockToBoard = function(shape) {
  this.pieces.push(shape);
  return shape;
};

Board.prototype.findBlockOnBoard = function(x, y) {
  for (let block of this.pieces) {
  if (block.x === x && block.y === y) { return block }
  }
};

Board.prototype.rowChecker = function() {
  for (let block of this.pieces) {
    this.rowBlockCount[block.y] += 1;
    if (this.rowBlockCount[block.y] === 10) { this.clearRow(block.y); }
  }
};

Board.prototype.clearRow = function(rowNumber) {
  this.pieces = _.reject(this.pieces, function(block){
    return block.y === rowNumber;
  });
  this.score += 150;
  this.moveBlocksAboveDown(rowNumber);
};

Board.prototype.moveBlocksAboveDown = function(rowNumber) {
  for (let block of this.pieces) {
    if (block.y < rowNumber) { block.moveDown(); }
  }
};

Board.prototype.currentShapeNotOnBottom = function(currentShape) {
  currentShape.piece.shape[4].y < this.rows &&
  currentShape.piece.shape[3].y < this.rows &&
  currentShape.piece.shape[2].y < this.rows &&
  currentShape.piece.shape[1].y < this.rows
};

module.exports = Board;
