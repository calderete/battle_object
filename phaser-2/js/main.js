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

    // battle object one
    this.battleObject = this.add.sprite(this.game.world.centerX, 500, 'mine');
    this.battleObject.anchor.setTo(0.5);
    this.battleObject.customParams = {
      name: "DPS",
      resolution: 100,
      power: 10,
      attack_speed: 1,
      objectId: 1,
      target: false,
      targeted_by: 0,
      weapons_free: true }

    this.battleObject.inputEnabled = true;
    this.battleObject.events.onInputDown.add(this.auto_attack, this)

    // enemy object two
    this.enemyObject = this.add.sprite(this.game.world.centerX, 100, 'mine');
    this.enemyObject.anchor.setTo(0.5);
    this.enemyObject.customParams = {
      name: "Enemy DPS",
      resolution: 100,
      power: 10,
      attack_speed: 2,
      objectId: 2,
      target: false,
      targeted_by: 0,
      weapons_free: true }

    this.enemyObject.inputEnabled = true;
    this.enemyObject.events.onInputDown.add(this.displayStats, this);

  },

  auto_attack: function() {
   // this.enemyObject.customParams.resolution -= this.battleObject.customParams.power
   this.game.time.events.loop(Phaser.Timer.SECOND * this.battleObject.customParams.attack_speed, this.damage, this);
   // console.log(this.enemyObject.customParams);
  },

  damage: function() {
    this.enemyObject.customParams.resolution -= this.battleObject.customParams.power;
    this.enemyObject.customParams.targeted_by = this.battleObject.customParams.objectId;
    console.log(this.enemyObject.customParams);
  },

  displayStats: function() {
    console.log(this.enemyObject.customParams)
  },

  update: function() {
    if(this.enemyObject.customParams.resolution == 0) {
    console.log("Enemy Destroyed!");
    }
  }
};

//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
