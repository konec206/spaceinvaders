function handleKeys() {

    // On est dans le menu principal
    if (this.game.isStarted() === false && this.game.isOptions() === false) {
        handleMainMenuKeys();
    }
    // OPTIONS
    else if (this.game.isOptions()) {
        handleOptionsKeys();
    }
    // Game Over
    else if (this.game.isEnded()) {
        // Espace
        if (currentlyPressedKeys[32]) {
            restartGame();
        }
        // Echap
        else if (currentlyPressedKeys[27]) {
            resetGame();
        }
    }
    else {
        handleGameKeys();
    }
}

function handleMainMenuKeys() {
    // Sélection d'une entrée du menu
    if (currentlyPressedKeys[13]) {
        var mainMenuEntry = this.mainMenu.getCursor().getPositionNumber();

        // Start Game
        if (mainMenuEntry === 1) {
            this.game.startGame();
            wait(100);
        }
        // Affichage des options
        else if (mainMenuEntry === 2) {
            this.game.options();
            wait(200);
        }
        // Affichage des meilleurs scores
        else if (mainMenuEntry === 3) {

        }
        // Affichage des crédits
        else if (mainMenuEntry === 4) {

        }
    }

    // Flèche du bas
    if (currentlyPressedKeys[40]) {
        if (this.mainMenu.getCursor().getPositionNumber() < this.mainMenu.getCursor().getNbLines()) {
            this.mainMenu.getCursor().setPositionNumber("MainMenu", this.mainMenu.getCursor().getPositionNumber() + 1);
            drawScene();
            wait(130); //On évite que l'action se déclenche plusieurs fois
        }
    }

    // Flèche du haut
    if (currentlyPressedKeys[38]) {
        if (this.mainMenu.getCursor().getPositionNumber() > 1) {
            this.mainMenu.getCursor().setPositionNumber("MainMenu", this.mainMenu.getCursor().getPositionNumber() - 1);
            drawScene();
            wait(130); //On évite que l'action se déclenche plusieurs fois
        }
    }
}

function handleOptionsKeys() {
    // Sélection d'une entrée du menu
    var optionsEntry = this.options.getCursor().getPositionNumber();
    if (optionsEntry === 1) optionsEntry = 11;
    var line = Math.round(optionsEntry / 10);
    var choice = optionsEntry % 10;

    //------ DÉPLACEMENTS A L'INTERIEUR DU MENU -----//
    // Flèche du bas
    if (currentlyPressedKeys[40]) {
        if (optionsEntry <= this.options.getCursor().getNbLines() * 10) {
            if (line === this.options.getCursor().getNbLines() - 1 && choice === 2) {
                optionsEntry = optionsEntry + 9;
            }
            else {
                optionsEntry = optionsEntry + 10;
            }

            line++;
            this.options.getCursor().setPositionNumber("Options", optionsEntry);
            drawScene();
            wait(130); //On évite que l'action se déclenche plusieurs fois

        }
    }

    // Flèche du haut
    if (currentlyPressedKeys[38]) {
        if (optionsEntry > 20) {
            optionsEntry = optionsEntry - 10;
            line--;
            this.options.getCursor().setPositionNumber("Options", optionsEntry);
            drawScene();
            wait(130); //On évite que l'action se déclenche plusieurs fois
        }
    }

    // Flèche de gauche
    if (currentlyPressedKeys[37]) {
        if (line !== this.options.getCursor().getNbLines() && choice === 2) {  // 2 choix par ligne, sauf pour la dernière (save)
            optionsEntry--;
            this.options.getCursor().setPositionNumber("Options", optionsEntry);
            drawScene();
            wait(130); //On évite que l'action se déclenche plusieurs fois
        }
    }

    // Flèche de droite
    if (currentlyPressedKeys[39]) {
        if (line !== this.options.getCursor().getNbLines() && choice === 1) {
            optionsEntry++;
            this.options.getCursor().setPositionNumber("Options", optionsEntry);
            drawScene();
            wait(130); //On évite que l'action se déclenche plusieurs fois
        }
    }

    // Échap
    if (currentlyPressedKeys[27]) {
        this.game.options();

        if (this.game.isStarted()) {
            this.game.pause();
        }
        wait(100);
    }

    // Sélection d'une entrée du menu options
    if (currentlyPressedKeys[13]) {
        optionsEntry = this.options.getCursor().getPositionNumber();

        if (optionsEntry === 11) {
            this.options.setSounds(true);
            wait(130);
        }
        else if (optionsEntry === 12) {
            this.options.setSounds(false);
            wait(130);
        }
        else if (optionsEntry === 21) {
            this.options.setLevel(1);
            wait(130);
        }
        else if (optionsEntry === 22) {
            this.options.setLevel(2);
            wait(130);
        }
        else if (optionsEntry === 31) {
            this.options.setSkin(1);
            spaceshipTexture = initTexture('images/spaceship/1.png');
            wait(130);
        }
        else if (optionsEntry === 32) {
            this.options.setSkin(2);
            spaceshipTexture = initTexture('images/spaceship/2.png');
            wait(130);
        }
        // Save
        else if (optionsEntry === 41) {
            this.game.options();
            if (this.game.isStarted()) {
                this.game.pause();
            }
            wait(130);
        }
    }
}

function handleGameKeys() {
    if (currentlyPressedKeys[80] || currentlyPressedKeys[27]) {
        // Touche p
        this.game.pause();
        if (this.menu.getCursor() === null) this.menu.cursor = this.cursor;
        this.menu.getCursor().setPositionNumber("Menu", 1);
        wait(300);  //On évite que l'action se déclenche plusieurs fois
    }

    // Contrôles du menu Pause
    if (this.game.isPaused()) {

        // MENU
        if (this.game.isOptions() === false) {
            // Sélection d'une entrée du menu
            if (currentlyPressedKeys[13]) {
                var pauseEntry = this.menu.getCursor().getPositionNumber();

                // Resume
                if (pauseEntry === 1) {
                    this.game.pause();
                }
                // Options
                else if (pauseEntry === 2) {
                    // Activation des options
                    this.game.options();
                    drawScene();
                    wait(130); //On évite que l'action se déclenche plusieurs fois
                }
                // Exit, retour au menu principal
                else if (pauseEntry === 3) {
                    resetGame();
                    wait(130);
                }
            }

            // Flèche du bas
            if (currentlyPressedKeys[40]) {
                if (this.menu.getCursor().getPositionNumber() < this.menu.getCursor().getNbLines()) {
                    this.menu.getCursor().setPositionNumber("Menu", this.menu.getCursor().getPositionNumber() + 1);
                    drawScene();
                    wait(130); //On évite que l'action se déclenche plusieurs fois
                }
            }

            // Flèche du haut
            if (currentlyPressedKeys[38]) {
                if (this.menu.getCursor().getPositionNumber() > 1) {
                    this.menu.getCursor().setPositionNumber("Menu", this.menu.getCursor().getPositionNumber() - 1);
                    drawScene();
                    wait(130); //On évite que l'action se déclenche plusieurs fois
                }
                // Flèche du haut
                if (currentlyPressedKeys[38]) {
                    if (this.menu.getCursor().getPositionNumber() > 1) {
                        this.menu.getCursor().setPositionNumber("Menu", this.menu.getCursor().getPositionNumber() - 1);
                        drawScene();
                        wait(130); //On évite que l'action se déclenche plusieurs fois
                    }
                }
            }
        }
    }
}