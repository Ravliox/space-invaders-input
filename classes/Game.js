class Game {
    constructor(element, stringElement, player, playerAttack) {
        this.gameboard = element;
        this.stringElement = stringElement;
        this.string = "";
        this.stage = 0;

        this.player = player;
        this.playerAttack = playerAttack;

        this.gameState = {
            powerUps: [],
            enemies: []
        };

        this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X","Y", "Z"];
        this.numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.symbols = ["!", "_", ".", "@", "?", "%", "^", "*", "-"];

        this.formModel = { 
            name: "",
            userName: "",
            password: "",
            confirmPassword: ""
        }
        this.fuckups = 0;

        this.messages = [
            "Input your name!",
            "Input your username!",
            "Input your password!",
            "Reinput your password!"
        ]

        this.errors = [
            "Name must be at least 5 letters",
            "Username must be at least 5 characters and must contain at least a letter and a number",
            "Password must be at least 5 characters must contain at least an upper case letter, a lower case letter, a number and a symbol!",
            "Passwords do not match!"
        ]

    }

    setGameState(state) {
        this.gameState = state;
    }
    
    updateGameState() {
        setInterval(() =>{
            if(this.playerAttack.getTopOffset() === 0) {
                this.resetPlayerAttack();
            }

            this.gameState.powerUps.forEach(powerUp => {
                if(this.player.isFiring && this.playerAttack.detectCollisionPowerUp(powerUp)) {
                    powerUp.setPositionY(true);
                    powerUp.setPositionX();
                    powerUp.startTimer();
                    this.resetPlayerAttack();
                    this.handlePowerUp(powerUp.type);
                }

                if(powerUp.getTopOffSet() == window.innerHeight + 40) {
                    powerUp.setPositionY(true);
                    powerUp.setPositionX();
                    powerUp.falling = false;
                    powerUp.startTimer();
                }
            })

            this.gameState.enemies.forEach(enemy => {
                if(this.playerAttack.detectCollisionEnemy(enemy)) {
                    this.resetPlayerAttack();
                    enemy.resetPosition();
                    this.addCharacter(enemy.character);
                }

                if(enemy.element.offsetLeft === window.innerWidth - 50) {
                    enemy.setDirection("left");
                    enemy.moveToSide();
                } else if (enemy.element.offsetLeft === 10) {
                    enemy.setDirection("right");
                    enemy.moveToSide();
                }
            })
        }, 0);
    }

    setPromptMessage(msg) {
        document.getElementById("prompt").innerHTML = msg;
    }

    setErrorPrompt(msg) {
        document.getElementById("error-prompt").innerHTML = msg;
    }

    addCharacter(character) {
        if(this.stage < 2) {
            this.string = this.string + character;
            this.stringElement.innerHTML = this.string;
        } else {
            this.string = this.string + character;
            this.stringElement.innerHTML = this.stringElement.innerHTML + "*";
        }

        switch(this.stage) {
            case 0:
                this.formModel.name = this.string;
                break
            case 1:
                this.formModel.userName = this.string;
            case 2:
                this.formModel.password = this.string;
            case 3:
                this.formModel.confirmPassword = this.string;
        }
    }

    backSpace() {
        this.string = this.string.slice(0, this.string.length - 1);
        if (this.stage < 2) {
            this.stringElement.innerHTML = this.string;
        } else {
            this.stringElement.innerHTML =this.stringElement.innerHTML.slice(0, this.string.length - 1);
        }
    }

    advanceStage() {
        let valid = this.validateInput(this.string);
        
        this.stringElement.innerHTML = "";
        this.string = "";

        if(valid) {
            this.stage = this.stage + 1;
            this.setPromptMessage(this.messages[this.stage]);
            this.setErrorPrompt("");

            if(this.stage === 1) {
                let spacePowerUp = this.gameState.powerUps.pop();
                spacePowerUp.stopTimer();
                this.createEnemies(this.numbers);
                this.positionEnemies(4);
                this.startEnemies();
            } else if (this.stage === 2) {
                let lowerCaseLetters = this.letters.toString().toLowerCase().split(",");
                this.createEnemies(this.symbols.concat(lowerCaseLetters));
                this.positionEnemies(7);
                this.startEnemies();
            }
        } else {
            this.setErrorPrompt(this.errors[this.stage]);

            if(this.stage === 3) {
                this.fuckups = this.fuckups + 1;
                if(this.fuckups > 2) {
                    document.getElementById("overlay-fuckup").style.display = "block";
                    this.gameState.enemies.forEach(enemy => enemy.increaseSecurity());
                    this.positionEnemies(7);
                    this.startEnemies();
                } 
            }
        }
    }

    validateInput() {
        switch(this.stage) {
            case 0: 
                if(this.formModel.name.length < 4) {
                    return false;
                }
                break;
            case 1:
                if(this.formModel.userName.length < 4 || this.checkForLetters(this.formModel.userName) === 0 
                || this.checkForNumbers(this.formModel.userName) === 0) {
                    return false;
                }
                break;
            case 2:
                if(this.formModel.password.length < 4 || this.checkForLetters(this.formModel.password) === 0 
                || this.checkForNumbers(this.formModel.password) === 0 || this.checkForSymbols(this.formModel.password) === 0) {
                    return false;
                }  
                break;
            case 3:
                if(this.formModel.confirmPassword !== this.formModel.password) {
                    return false; 
                }
                break;              
        }
        return true;
    }



    checkForLetters(string) {
        let letterCount = 0;
        string.split("").forEach(char => {
            if (this.letters.includes(char)) {
                letterCount = letterCount + 1;
            }
        });
        return letterCount;
    }

    checkForLowerCaseLetters(string) {
        let lowerCaseLetterCount = 0;
        let lowerCaseLetters = this.letters.toString().toLowerCase().split(",");

        string.split("").forEach(char => {
            if(lowerCaseLetters.includes(char)) {
                lowerCaseLetterCount = lowerCaseLetterCount + 1;
            }
        })
        return lowerCaseLetterCount;
    }

    checkForNumbers(string) {
        let numberCount = 0;
        string.split("").forEach(char => {
            if (this.numbers.includes(char)) {
                numberCount = numberCount + 1;
            }
        });
        return numberCount;
    }

    checkForSymbols(string) {
        let symbolCount = 0;
        string.split("").forEach(char => {
            if (this.symbols.includes(char)) {
                symbolCount = symbolCount + 1;
            }
        });
        return symbolCount;    
    }

    handlePowerUp(type) {
        if(type === "backspace") {
            this.backSpace();
        } if (type === "space") {
            this.addCharacter(" ");
        } if (type === "submit") {
            this.advanceStage();
        }
    }

    initializePowerUps() {
        this.gameState.powerUps.push(new PowerUp(document.getElementById("submit"), "submit"));
        this.gameState.powerUps.push(new PowerUp(document.getElementById("backspace"), "backspace"));
        this.gameState.powerUps.push(new PowerUp(document.getElementById("space"), "space"));
    }

    startPowerUpTimers() {
        this.gameState.powerUps.forEach(powerUp => {
            powerUp.startTimer();
        })
    }


    resetPlayerAttack() {
        this.player.lockDownFiring(false);

        this.playerAttack.changeTransition(true);
        this.playerAttack.repositionX(this.player.leftOffset + 49);
        this.playerAttack.modifyPositionY(window.innerHeight - 120);
    }

    createEnemies(characters) {        
        this.shuffleArray(characters);
        
        for (let character of characters) {
            let characterElement = document.createElement("div");
            characterElement.classList.add("character-container");
            characterElement.innerHTML = character;
            this.gameboard.append(characterElement);
            this.gameState.enemies.push(new Enemy(character, characterElement));
        }
    }

    positionEnemies(rows) {
        this.gameState.enemies.forEach(enemy => {
            let topOffSet = 10 + 50 * Math.floor(Math.random() * rows);
            enemy.setTopOffset(topOffSet);

            let leftOffset = Math.floor(Math.random() * window.innerWidth);
            enemy.setLeftOffset(leftOffset);

            let direction = Math.floor(Math.random() * 3) > 1 ? "left" : "right";
            enemy.setDirection(direction);
        })
    }

    startEnemies() {
        this.gameState.enemies.forEach(enemy => {
            enemy.moveToSide();
        })
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

}