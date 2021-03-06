var ennemyShader;

function initGreenEnnemyShader() {
    ennemyShader = initShaders("green_ennemy-vs","green_ennemy-fs");

    // active ce shader
    gl.useProgram(ennemyShader);

    // récupère la localisation de l'attribut dans lequel on souhaite accéder aux positions
    ennemyShader.vertexPositionAttribute = gl.getAttribLocation(ennemyShader, "aVertexPosition");
    gl.enableVertexAttribArray(ennemyShader.vertexPositionAttribute); // active cet attribut

    // pareil pour les coordonnées de texture
    ennemyShader.vertexCoordAttribute = gl.getAttribLocation(ennemyShader, "aVertexCoord");
    gl.enableVertexAttribArray(ennemyShader.vertexCoordAttribute);

    // adresse de la variable uniforme uOffset dans le shader
    ennemyShader.positionUniform = gl.getUniformLocation(ennemyShader, "uPosition");
    ennemyShader.maTextureUniform = gl.getUniformLocation(ennemyShader, "uMaTexture");
}

function Green_Ennemy() {
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
        0.525, 0.76,
        0.635, 0.76,
        0.635, 0.92,
        0.525, 0.92
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

Green_Ennemy.prototype.initParameters = function() {
    this.width = 0.2;
    this.height = 0.2;
    this.initialPosition = [0.0, 0.0];
    this.direction = 0; // 0 vers la gauche, 1 vers la droite
    this.position = [0.0,-0.7];
    this.hp = 100;
    this.worth = 20; // Valeur de l'ennemi sur le score, lorsqu'il est tué
};

Green_Ennemy.prototype.getWorth = function(){
    return this.worth;
};

Green_Ennemy.prototype.setDirection = function(direction){
    this.direction = direction;
};

Green_Ennemy.prototype.getDirection = function() {
    return this.direction;
}

Green_Ennemy.prototype.setParameters = function(elapsed) {
    // on pourrait animer des choses ici

};

Green_Ennemy.prototype.setInitialPosition = function(x, y){
    this.initialPosition = [x, y];
    this.setPosition(x, y);
};

Green_Ennemy.prototype.getInitialPosition = function() {
    return this.initialPosition;
};

Green_Ennemy.prototype.setPosition = function(x, y) {
    this.position = [x,y];
};


Green_Ennemy.prototype.isAlive = function(){
    return this.hp > 0;
};


Green_Ennemy.prototype.setHp = function(newHpValue){
    this.hp = newHpValue;
};

Green_Ennemy.prototype.getHp = function(){
    return this.hp;
};

Green_Ennemy.prototype.shader = function() {
    return ennemyShader;
};

Green_Ennemy.prototype.sendUniformVariables = function() {
    gl.uniform2fv(ennemyShader.positionUniform,this.position);
};

Green_Ennemy.prototype.draw = function() {
    // active le buffer de position et fait le lien avec l'attribut aVertexPosition dans le shader
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(ennemyShader.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // active le buffer de coords
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
    gl.vertexAttribPointer(ennemyShader.vertexCoordAttribute, this.coordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // dessine les buffers actifs
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles);
    gl.drawElements(gl.TRIANGLES, this.triangles.numItems, gl.UNSIGNED_SHORT, 0);
};


