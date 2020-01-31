class Player {
    constructor(element) {
        this.element = element;
        this.isFiring = false;
        this.leftOffset = this.element.offsetLeft;
    }
    
    modifyPosition(offset) {
        this.element.style.left = this.leftOffset + offset;
        this.leftOffset = this.element.offsetLeft;
    }

    lockDownFiring(isFiring) {
        this.isFiring = isFiring;
    }
}

class PlayerAttack {
    constructor(element) {
        this.element = element;
        this.leftOffset = this.element.offsetLeft;
        this.element.style.transition = "1s top";

        this.transitionStates = {
            animated: "1s top linear",
            instant: "0s top"
        }
    }

    modifyPositionX(offset) {
        this.element.style.left = this.leftOffset + offset;
        this.leftOffset = this.element.offsetLeft;    
    }

    repositionX(offset) {
        this.element.style.left = offset;
        this.leftOffset = this.element.offsetLeft;
    }

    modifyPositionY(offset) {
        this.element.style.top = offset;
    }

    changeTransition(instant) {
        this.element.style.transition = instant ? this.transitionStates.instant : this.transitionStates.animated;
    }

    getTopOffset() {
        return this.element.offsetTop;
    }

    detectCollisionEnemy(enemyLetter) {
        let enemyLetterVerticalBorder = enemyLetter.element.offsetTop + 35;
        let enemyLetterHorizontalBorder1 = enemyLetter.element.offsetLeft;
        let enemyLetterHorizontalBorder2 = enemyLetter.element.offsetLeft + 35; 
        if(this.element.offsetTop <= enemyLetterVerticalBorder && this.element.offsetTop >= enemyLetter.element.offsetTop 
            && this.element.offsetLeft >= enemyLetterHorizontalBorder1 && this.element.offsetLeft <= enemyLetterHorizontalBorder2) {
            return true;
        }
        return false;
    }

    detectCollisionPowerUp(powerUp) {
        let powerUpVerticalBorder = powerUp.element.offsetTop + 45;
        let powerUpHorizontalBorder1 = powerUp.element.offsetLeft;
        let powerUpHorizontalBorder2 = powerUp.element.offsetLeft + 150;

        if(this.element.offsetTop <= powerUpVerticalBorder && this.element.offsetTop >= powerUp.element.offsetTop 
            && this.element.offsetLeft >= powerUpHorizontalBorder1 && this.element.offsetLeft <= powerUpHorizontalBorder2) {
            return true;
        }
        return false;

    }
}