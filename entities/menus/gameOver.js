var gameOverShader;

function initGameOverShader() {
    gameOverShader = initShaders("gameOver-vs","gameOver-fs");

    // active ce shader
    gl.useProgram(gameOverShader);

    // recupere la localisation de l'attribut dans lequel on souhaite accéder aux positions
    gameOverShader.vertexPositionAttribute = gl.getAttribLocation(gameOverShader, "aVertexPosition");
    gl.enableVertexAttribArray(gameOverShader.vertexPositionAttribute); // active cet attribut

    // pareil pour les coordonnées de texture
    gameOverShader.vertexCoordAttribute = gl.getAttribLocation(gameOverShader, "aVertexCoord");
    gl.enableVertexAttribArray(gameOverShader.vertexCoordAttribute);

    // adresse de la variable uniforme uOffset dans le shader
    gameOverShader.positionUniform = gl.getUniformLocation(gameOverShader, "uPosition");
    gameOverShader.maTextureUniform = gl.getUniformLocation(gameOverShader, "uMaTexture");
}

function GameOver() {
    this.initParameters();

    // cree un nouveau buffer sur le GPU et l'active
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    // un tableau contenant les positions des sommets (sur CPU donc)
    var wo2 = 0.5*this.width;
    var ho2 = 0.5*this.height;

    var vertices = [
        -wo2,-ho2, -0.5,
        wo2,-ho2, -0.5,
        wo2, ho2, -0.5,
        -wo2, ho2, -0.5
    ];

    // on envoie ces positions au GPU ici (et on se rappelle de leur nombre/taille)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    this.vertexBuffer.itemSize = 3;
    this.vertexBuffer.numItems = 4;

    // meme principe pour les couleurs
    this.coordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
    var coords = [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ];
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
    this.coordBuffer.itemSize = 2;
    this.coordBuffer.numItems = 4;

    // creation des faces du cube (les triangles) avec les indices vers les sommets
    this.triangles = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles);
    var tri = [0,1,2,0,2,3];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tri), gl.STATIC_DRAW);
    this.triangles.numItems = 6;
}

GameOver.prototype.initParameters = function() {
    this.width = 1.9;
    this.height = 1.9;
    this.position = [0.0,-0.0];
};

GameOver.prototype.setParameters = function(elapsed) {
    // on pourrait animer des choses ici

};

GameOver.prototype.setPosition = function(x,y) {
    this.position = [x,y];
};

GameOver.prototype.shader = function() {
    return gameOverShader;
};

GameOver.prototype.setCursor = function(cursor) {
    this.cursor = cursor;
};

GameOver.prototype.getCursor = function() {
    return this.cursor;
}

GameOver.prototype.sendUniformVariables = function() {
    gl.uniform2fv(gameOverShader.positionUniform,this.position);
};

GameOver.prototype.draw = function() {
    // active le buffer de position et fait le lien avec l'attribut aVertexPosition dans le shader
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(gameOverShader.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // active le buffer de coords
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
    gl.vertexAttribPointer(gameOverShader.vertexCoordAttribute, this.coordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // dessine les buffers actifs
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles);
    gl.drawElements(gl.TRIANGLES, this.triangles.numItems, gl.UNSIGNED_SHORT, 0);
};