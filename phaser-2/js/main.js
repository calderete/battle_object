//this game will have only 1 state
var GameState = {

  init: function() {
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function() {
    this.load.image('city', 'assets/city_background.png');
    this.load.image('mine', 'assets/mine.bmp');
  },
  create: function() {
    this.add.image(400, 300, 'city');
    player = this.add.image(100, 450, 'mine');
  }
};

//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
