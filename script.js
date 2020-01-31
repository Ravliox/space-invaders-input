let game;

window.onload = function() {
    let player = new Player(this.document.getElementById("player"));
    let playerAttack = new PlayerAttack(this.document.getElementById("player-attack"));
    game = new Game(this.document.getElementById("gameboard"), this.document.getElementById("composing-message"), player, playerAttack);

    let overlay = this.document.getElementById("overlay");
    let fuckupOverlay = this.document.getElementById("overlay-fuckup");
    let startButton = this.document.getElementById("start-button");
    let fuckupButton = this.document.getElementById("fuckup-button");

    this.document.addEventListener("keydown", (event) => {
        if(event.code === "ArrowRight") {
            game.player.modifyPosition(25);
            if(!game.player.isFiring) {
                game.playerAttack.modifyPositionX(25);
            }
        }
        if(event.code === "ArrowLeft") {
            game.player.modifyPosition(-25);
            if(!game.player.isFiring) {
                game.playerAttack.modifyPositionX(-25);
            }
        }
        if(event.code === "Space") {
            game.player.lockDownFiring(true);
            game.playerAttack.changeTransition(false);
            game.playerAttack.modifyPositionY(0);
        }
    });

    startButton.addEventListener("click", () => {
        overlay.style.display = "none";
        initializeGame();
    })

    fuckupButton.addEventListener("click", () => {
        fuckupOverlay.style.display = "none";
    });

    function initializeGame() {
        game.setPromptMessage(game.messages[0]);
        game.initializePowerUps();
        game.createEnemies(game.letters);
        game.positionEnemies(3);
        game.startEnemies();
        game.startPowerUpTimers();
        game.updateGameState();
    }
    
}

window.onresize = function() {
    game.rightLimit = window.innerWidth;
    game.dealWithResize();
}