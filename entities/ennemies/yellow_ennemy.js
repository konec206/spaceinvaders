var yellowEnnemyShader;

function initYellowEnnemyShader() {
    yellowEnnemyShader = initShaders("yellow_ennemy-vs","yellow_ennemy-fs");

    // active ce shader
    gl.useProgram(yellowEnnemyShader);

    // récupère la localisation de l'attribut dans lequel on souhaite accéder aux positions
    yellowEnnemyShader.vertexPositionAttribute = gl.getAttribLocation(yellowEnnemyShader, "aVertexPosition");
    gl.enableVertexAttribArray(yellowEnnemyShader.vertexPositionAttribute); // active cet attribut

    // pareil pour les coordonnées de texture
    yellowEnnemyShader.vertexCoordAttribute = gl.getAttribLocation(yellowEnnemyShader, "aVertexCoord");
    gl.enableVertexAttribArray(yellowEnnemyShader.vertexCoordAttribute);

    // adresse de la variable uniforme uOffset dans le shader
    yellowEnnemyShader.positionUniform = gl.getUniformLocation(yellowEnnemyShader, "uPosition");
    yellowEnnemyShader.maTextureUniform = gl.getUniformLocation(yellowEnnemyShader, "uMaTexture");
}

function Yellow_Ennemy() {
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
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0
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

Yellow_Ennemy.prototype.initParameters = function() {
    this.width = 0.2;
    this.height = 0.2;
    this.initialPosition = [0.0, 0.0];
    this.direction = 0; // 0 vers la gauche, 1 vers la droite
    this.position = [0.0,-0.7];
    this.hp = 150;
    this.worth = 30; // Valeur de l'ennemi sur le score, lorsqu'il est tué
};

Yellow_Ennemy.prototype.getWorth = function(){
    return this.worth;
};

Yellow_Ennemy.prototype.setDirection = function(direction){
    this.direction = direction;
};

Yellow_Ennemy.prototype.getDirection = function() {
    return this.direction;
}

Yellow_Ennemy.prototype.setParameters = function(elapsed) {
    // on pourrait animer des choses ici

};

Yellow_Ennemy.prototype.setInitialPosition = function(x, y){
    this.initialPosition = [x, y];
    this.setPosition(x, y);
};

Yellow_Ennemy.prototype.getInitialPosition = function() {
    return this.initialPosition;
};

Yellow_Ennemy.prototype.setPosition = function(x, y) {
    this.position = [x,y];
};


Yellow_Ennemy.prototype.isAlive = function(){
    return this.hp > 0;
};


Yellow_Ennemy.prototype.setHp = function(newHpValue){
    this.hp = newHpValue;
};

Yellow_Ennemy.prototype.getHp = function(){
    return this.hp;
};

Yellow_Ennemy.prototype.shader = function() {
    return yellowEnnemyShader;
};

Yellow_Ennemy.prototype.sendUniformVariables = function() {
    gl.uniform2fv(yellowEnnemyShader.positionUniform,this.position);
};

Yellow_Ennemy.prototype.draw = function() {
    // active le buffer de position et fait le lien avec l'attribut aVertexPosition dans le shader
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(yellowEnnemyShader.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // active le buffer de coords
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
    gl.vertexAttribPointer(yellowEnnemyShader.vertexCoordAttribute, this.coordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // dessine les buffers actifs
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles);
    gl.drawElements(gl.TRIANGLES, this.triangles.numItems, gl.UNSIGNED_SHORT, 0);
};


