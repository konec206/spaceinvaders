function Game(){
    this.initParameters();
}

Game.prototype.initParameters = function() {
    this.score = 0;
    this.paused = false;
    this.ended = false;
};

Game.prototype.addScore = function(scoreToAdd){
    this.score += scoreToAdd;
}

Game.prototype.setScore = function(newScore){
  this.score = newScore;
};

Game.prototype.getScore = function() {
    return this.score;
};

Game.prototype.pause = function(){
    this.paused = !this.paused;
    drawPause();
};

Game.prototype.isPaused = function(){
    return this.paused;
};

Game.prototype.end = function(){
    this.ended = true;
    console.log("Game ended.\nFinal score : " + this.getScore());
};

Game.prototype.isEnded = function(){
    return this.ended;
}