var menuShader;

function initMenuShader() {
    menuShader = initShaders("menu-vs","menu-fs");

    // active ce shader
    gl.useProgram(menuShader);

    // recupere la localisation de l'attribut dans lequel on souhaite accéder aux positions
    menuShader.vertexPositionAttribute = gl.getAttribLocation(menuShader, "aVertexPosition");
    gl.enableVertexAttribArray(menuShader.vertexPositionAttribute); // active cet attribut

    // pareil pour les coordonnées de texture
    menuShader.vertexCoordAttribute = gl.getAttribLocation(menuShader, "aVertexCoord");
    gl.enableVertexAttribArray(menuShader.vertexCoordAttribute);

    // adresse de la variable uniforme uOffset dans le shader
    menuShader.positionUniform = gl.getUniformLocation(menuShader, "uPosition");
    menuShader.maTextureUniform = gl.getUniformLocation(menuShader, "uMaTexture");
}

function Menu() {
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

Menu.prototype.initParameters = function() {
    this.width = 1.4;
    this.height = 1.4;
    this.position = [0.0,-0.0];
    this.cursor = null;
};

Menu.prototype.setParameters = function(elapsed) {
    // on pourrait animer des choses ici

};

Menu.prototype.setPosition = function(x,y) {
    this.position = [x,y];
};

Menu.prototype.shader = function() {
    return menuShader;
};

Menu.prototype.setCursor = function(cursor) {
    this.cursor = cursor;
};

Menu.prototype.getCursor = function() {
    return this.cursor;
};

Menu.prototype.sendUniformVariables = function() {
    gl.uniform2fv(menuShader.positionUniform,this.position);
};

Menu.prototype.draw = function() {
    // active le buffer de position et fait le lien avec l'attribut aVertexPosition dans le shader
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(menuShader.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // active le buffer de coords
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
    gl.vertexAttribPointer(menuShader.vertexCoordAttribute, this.coordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // dessine les buffers actifs
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles);
    gl.drawElements(gl.TRIANGLES, this.triangles.numItems, gl.UNSIGNED_SHORT, 0);
}


