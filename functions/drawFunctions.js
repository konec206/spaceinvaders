function drawOptions() {
    gl.useProgram(options.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, optionsTexture); // on place maTexture dans l'unité active
    gl.uniform1i(options.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    options.sendUniformVariables();
    options.draw();
}

function drawGameOver(){
    gl.useProgram(gameOver.shader());
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, gameOverTexture);
    gl.uniform1i(gameOver.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    gameOver.sendUniformVariables();
    gameOver.draw();
}

function drawOptionsCursor(direction) {
    gl.useProgram(options.cursor.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    if (direction === 'left') {
        gl.bindTexture(gl.TEXTURE_2D, cursorTexture); // on place maTexture dans l'unité active
    }
    else {
        gl.bindTexture(gl.TEXTURE_2D, cursorLeftTexture); // on place maTexture dans l'unité active
    }

    gl.uniform1i(options.cursor.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    options.cursor.sendUniformVariables();
    options.cursor.draw();
}

function drawMainMenu() {
    gl.useProgram(mainMenu.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, mainMenuTexture); // on place maTexture dans l'unité active
    gl.uniform1i(mainMenu.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    mainMenu.sendUniformVariables();
    mainMenu.draw();
}

function drawMainMenuCursor() {
    gl.useProgram(mainMenu.cursor.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, cursorTexture); // on place maTexture dans l'unité active
    gl.uniform1i(mainMenu.cursor.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    mainMenu.cursor.sendUniformVariables();
    mainMenu.cursor.draw();
}

function drawMenu() {
    gl.useProgram(menu.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, menuTexture); // on place maTexture dans l'unité active
    gl.uniform1i(menu.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    menu.sendUniformVariables();
    menu.draw();
}

function drawMenuCursor() {
    gl.useProgram(menu.cursor.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, cursorTexture); // on place maTexture dans l'unité active
    gl.uniform1i(menu.cursor.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    menu.cursor.sendUniformVariables();
    menu.cursor.draw();
}

function drawHeightfield() {
    gl.useProgram(heightfield.shader());
    heightfield.sendUniformVariables();
    heightfield.draw();
}

function drawBackground() {
    gl.useProgram(background.shader());
    background.sendUniformVariables();
    background.draw();
}

function drawSpaceShip() {
    gl.useProgram(spaceship.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, spaceshipTexture); // on place maTexture dans l'unité active
    gl.uniform1i(spaceship.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    spaceship.sendUniformVariables();
    spaceship.draw();
}

function drawBullets() {
    gl.useProgram(bullet.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, bulletTexture); // on place maTexture dans l'unité active
    gl.uniform1i(bullet.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    for (var i = 0; i < bullets.length; i++) {
        bullets[i].sendUniformVariables();
        bullets[i].draw();

        // On évite que les munitions soient stockées à l'infini
        if (i > 50) {
            bullets.shift();
        }
    }
}

function drawEnnemyBullets() {
    gl.useProgram(ennemyBullet.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, ennemyBulletTexture); // on place maTexture dans l'unité active
    gl.uniform1i(ennemyBullet.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    for (var i = 0; i < ennemyBullets.length; i++) {
        ennemyBullets[i].sendUniformVariables();
        ennemyBullets[i].draw();

        // On évite que les munitions soient stockées à l'infini
        if (i > 50) {
            ennemyBullets.shift();
        }
    }
}

function drawEnnemies() {
    gl.useProgram(green_ennemy.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, greenEnnemyTexture); // on place maTexture dans l'unité active
    gl.uniform1i(green_ennemy.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0

    drawGreenEnnemies();


    gl.useProgram(yellow_ennemy.shader());
    gl.activeTexture(gl.TEXTURE0); // on active l'unite de texture 0
    gl.bindTexture(gl.TEXTURE_2D, yellowEnnemyTexture); // on place maTexture dans l'unité active
    gl.uniform1i(yellow_ennemy.shader().maTextureUniform, 0); // on dit au shader que maTextureUniform se trouve sur l'unite de texture 0
    drawYellowEnnemies();
}

function drawGreenEnnemies() {
    for (var i = 0; i < green_ennemies.length; i++) {
        if (green_ennemies[i].getHp() <= 0) {
            // ANIMATION DE MORT?

            this.game.addScore(green_ennemies[i].getWorth()); // On ajoute des points au score
            green_ennemies.splice(green_ennemies.indexOf(green_ennemies[i]), 1);

            // On joue un son d'explosion si l'option est activée
            if(this.options.isSoundEnabled()){
                var sound_played = false;
                var a = 0;
                while (sound_played === false && a < bullet_contact_sounds.length) {
                    if (bullet_contact_sounds[a].currentTime === 0) {
                        bullet_contact_sounds[a].play();
                        sound_played = true;
                    }
                    else bullet_contact_sounds[a].load();
                    a++;
                }
            }
        }
        else {
            green_ennemies[i].sendUniformVariables();
            green_ennemies[i].draw();

            // On évite que les green_ennemies soient stockés à l'infini
            if (i > 30) {
                green_ennemies.shift();
            }
        }
    }
}

function drawYellowEnnemies() {
    for (var i = 0; i < yellow_ennemies.length; i++) {
        if (yellow_ennemies[i].getHp() <= 0) {
            // ANIMATION DE MORT?

            this.game.addScore(yellow_ennemies[i].getWorth()); // On ajoute des points au score
            yellow_ennemies.splice(yellow_ennemies.indexOf(yellow_ennemies[i]), 1);

            // On joue un son d'explosion si l'option des sons est activée
            if(this.options.isSoundEnabled()){
                var sound_played = false;
                var a = 0;
                while (sound_played === false && a < bullet_contact_sounds.length) {
                    if (bullet_contact_sounds[a].currentTime === 0) {
                        bullet_contact_sounds[a].play();
                        sound_played = true;
                    }
                    else bullet_contact_sounds[a].load();
                    a++;
                }
            }
        }
        else {
            yellow_ennemies[i].sendUniformVariables();
            yellow_ennemies[i].draw();

            // On évite que les green_ennemies soient stockés à l'infini
            if (i > 30) {
                yellow_ennemies.shift();
            }
        }
    }
}