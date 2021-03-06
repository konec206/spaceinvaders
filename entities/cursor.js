var cursorShader;

function initCursorShader() {
    cursorShader = initShaders("cursor-vs", "cursor-fs");

    // active ce shader
    gl.useProgram(cursorShader);

    // récupère la localisation de l'attribut dans lequel on souhaite accéder aux positions
    cursorShader.vertexPositionAttribute = gl.getAttribLocation(cursorShader, "aVertexPosition");
    gl.enableVertexAttribArray(cursorShader.vertexPositionAttribute); // active cet attribut

    // pareil pour les coordonnées de texture
    cursorShader.vertexCoordAttribute = gl.getAttribLocation(cursorShader, "aVertexCoord");
    gl.enableVertexAttribArray(cursorShader.vertexCoordAttribute);

    // adresse de la variable uniforme uOffset dans le shader
    cursorShader.positionUniform = gl.getUniformLocation(cursorShader, "uPosition");
    cursorShader.maTextureUniform = gl.getUniformLocation(cursorShader, "uMaTexture");
}

function Cursor(nbLines, menuType) {
    this.initParameters(nbLines, menuType);

    // cree un nouveau buffer sur le GPU et l'active
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    // un tableau contenant les positions des sommets (sur CPU donc)
    var wo2 = 0.5 * this.width;
    var ho2 = 0.5 * this.height;

    var vertices = [
        -wo2, -ho2, -0.5,
        wo2, -ho2, -0.5,
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
    var tri = [0, 1, 2, 0, 2, 3];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tri), gl.STATIC_DRAW);
    this.triangles.numItems = 6;
}

Cursor.prototype.initParameters = function (nbLines, menuType) {
    this.width = 0.2;
    this.height = 0.2;
    this.setPosition(-0.5, 0.1);
    this.positionNumber = this.setPositionNumber(menuType, -1);
    this.nbLines = nbLines;
};

Cursor.prototype.setParameters = function (elapsed) {
    // on pourrait animer des choses ici

};

Cursor.prototype.setPosition = function (x, y) {
    this.position = [x, y];
};

Cursor.prototype.setNbLines = function(nbLines) {
    this.nbLines = nbLines;
};

Cursor.prototype.getNbLines = function () {
    return this.nbLines;
};

Cursor.prototype.setPositionNumber = function (menuType, nb) {
    this.positionNumber = nb;

    if(menuType === "MainMenu"){
        if (nb === 1) {
            this.setPosition(-0.5, 0.12);
        }
        else if (nb === 2) {
            this.setPosition(-0.5, -0.12);
        }
        else if (nb === 3) {
            this.setPosition(-0.5, -0.38);
        }
        else if (nb === 4) {
            this.setPosition(-0.5, -0.65);
        }
    }
    else if (menuType === "Menu") {
        if (nb === 1) {
            this.setPosition(-0.5, 0.1);
        }
        else if (nb === 2) {
            this.setPosition(-0.5, -0.18);
        }
        else if (nb === 3) {
            this.setPosition(-0.35, -0.47);
        }
    }
    else if (menuType === "Options") {

        //Première ligne (Audio)
        if (this.getPositionNumber() === 11) { // ON
            this.setPosition(-0.05, 0.19);
        }
        else if (this.getPositionNumber() === 12) { // OFF
            this.setPosition(0.75, 0.19);
        }

        //Deuxième ligne (Level)
        else if (this.getPositionNumber() === 21) {
            this.setPosition(-0.25, -0.03);
        }
        else if(this.getPositionNumber() === 22) {
            this.setPosition(0.90, -0.03);
        }

        //Troisième ligne (Skin)
        else if (this.getPositionNumber() === 31) {
            this.setPosition(-0.15, -0.33);
        }
        else if (this.getPositionNumber() === 32) {
            this.setPosition(0.85, -0.33);
        }

        //Quatrième ligne (Save)
        else if (this.getPositionNumber() === 41) {
            this.setPosition(-0.35, -0.7);
        }
        else if (this.getPositionNumber() === 42) {
            this.setPosition(0.2, -0.8);
        }

        // Position par défaut
        else this.setPositionNumber("Options", 11); // Si la valeur est incorrecte, on replace le curseur sur la première position
    }

};

Cursor.prototype.getPositionNumber = function () {
    if(this.positionNumber > 0) return this.positionNumber;
    else return 1;
};

Cursor.prototype.shader = function () {
    return cursorShader;
};

Cursor.prototype.sendUniformVariables = function () {
    gl.uniform2fv(cursorShader.positionUniform, this.position);
};

Cursor.prototype.draw = function () {
    // active le buffer de position et fait le lien avec l'attribut aVertexPosition dans le shader
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(cursorShader.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // active le buffer de coords
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
    gl.vertexAttribPointer(cursorShader.vertexCoordAttribute, this.coordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // dessine les buffers actifs
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles);
    gl.drawElements(gl.TRIANGLES, this.triangles.numItems, gl.UNSIGNED_SHORT, 0);
};