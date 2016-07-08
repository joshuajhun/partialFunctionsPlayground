var assert = require('chai').assert;
// var Block = require('../lib/block');
var Board = require('../lib/board');
var Block = require('../lib/block');
require('locus')

describe('Game Block', function() {

  beforeEach(function () {
    this.board = new Board();
  });

  it('should default to 5x and 5y', function() {
    let block = new Block(this.board)
    assert.equal(block.x, 5);
    assert.equal(block.y, 5);
  });

  it('can move down', function(){
    let block = new Block(this.board,5,15)
    this.board.addBlockToBoard(block);
    block.moveDown();
    assert.equal(block.y, 16);
  });

  it('can move left',function(){
    let block = new Block(this.board,10,15)
    this.board.addBlockToBoard(block);
    block.moveLeft();
    assert.equal(block.x, 9);
  });

  it('can move right', function(){
    let block = new Block(this.board,10,15)
    this.board.addBlockToBoard(block);
    block.moveRight();
    assert.equal(block.x, 11 );
  });

  it('should default to active', function(){
    let block = new Block(this.board,10,10)
    this.board.addBlockToBoard(block);
    assert.equal(block.active, true);
  });

  it('inactive function changes status of block to false', function(){
    let block = new Block(this.board, 0,20)
    assert.equal(block.inactive(), false);
  });

  it('can tell if the block is at the bottom of the board', function(){
    let block = new Block(this.board, 5,20)
    assert.equal(block.blockIsAtBottomOfBoard(), true);
  });

  it('can tell if the block is at the left side of the board', function(){
    let block = new Block(this.board, 0,20)
    assert.equal(block.blockIsAtLeftSideOfBoard(), true);
  });

  it('can tell if the block is at the right side of the board', function(){
    let block = new Block(this.board, 10, 5);
    assert.equal(block.blockIsAtRightSideOfBoard(), true);
  });

  it('cannot move down when it is at the bottom of the board', function(){
    let block = new Block(this.board, 10,20)
    this.board.addBlockToBoard(block)
    assert.equal(block.canMoveDown(), false);
  });

  it('cannot move left when it as the leftside of the board', function(){
    let block = new Block(this.board, 0,20)
    this.board.addBlockToBoard(block)
    assert.equal(block.canMoveLeft(),false);
  });

  it('cannot move right when it as the rightside of the board', function(){
    let block = new Block(this.board, 10,15)
    this.board.addBlockToBoard(block)
  });

  it('can detect whether theres a block to the right', function(){
    let block = new Block(this.board, 1,1)
    let block2 = new Block(this.board, 2, 1);
    this.board.addBlockToBoard(block)
    this.board.addBlockToBoard(block2)
    assert.equal(block.isThereABlockOnTheRight(), true);
  });

  it('can detect whether theres a block to the left', function(){
    let block  = new Block(this.board, 2,1)
    let block2 = new Block(this.board, 1,1)
    this.board.addBlockToBoard(block)
    this.board.addBlockToBoard(block2)
    assert.equal(block.isThereABlockOnTheLeft(), true);
  });

  it('can detect whether theres a block in the space below', function(){
    let block  = new Block(this.board, 2,1)
    let block2 = new Block(this.board, 2,2)
    this.board.addBlockToBoard(block)
    this.board.addBlockToBoard(block2)
    assert.equal(block.isThereABlockBelow(), true);
  });

  it('cannot move to the right if there is a block next to it', function(){
    let block = new Block(this.board, 1,1)
    let block2 = new Block(this.board, 2, 1);
    this.board.addBlockToBoard(block)
    this.board.addBlockToBoard(block2)
    assert.equal(block.canMoveRight(), false);
  });

  it('cannot move to the left if there is a block next to it', function(){
    let block  = new Block(this.board, 2,1)
    let block2 = new Block(this.board, 1,1)
    this.board.addBlockToBoard(block)
    this.board.addBlockToBoard(block2)
    assert.equal(block.canMoveLeft(), false);
  });

  it('cannot move down if there is a block below it', function(){
    let block = new Block(this.board,2, 1)
    let block2 = new Block(this.board,2,2)
    this.board.addBlockToBoard(block)
    this.board.addBlockToBoard(block2);
    assert.equal(block.canMoveDown(), false);
  });
});
