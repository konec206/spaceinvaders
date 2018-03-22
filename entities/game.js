function Game() {
    this.initParameters();
}

Game.prototype.initParameters = function () {
    this.score = 0;
    this.started = false;
    this.paused = false;
    this.ended = false;
    this.inOptions = false;
};

Game.prototype.addScore = function (scoreToAdd) {
    this.score += scoreToAdd;
};

Game.prototype.setScore = function (newScore) {
    this.score = newScore;
};

Game.prototype.startGame = function () {
    this.started = true;
};

Game.prototype.isStarted = function () {
    return this.started;
};

Game.prototype.getScore = function () {
    return this.score;
};

Game.prototype.pause = function () {
    this.paused = !this.paused;
};

Game.prototype.options = function () {
    this.inOptions = !this.inOptions;
};

Game.prototype.isPaused = function () {
    return this.paused;
};

Game.prototype.isOptions = function () {
    return this.inOptions;
};

Game.prototype.end = function () {
    this.ended = true;
    console.log("Game ended.\nFinal score : " + this.getScore());
};

Game.prototype.isEnded = function () {
    return this.ended;
}