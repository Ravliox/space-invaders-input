class Enemy {
    constructor(character, element) {
        this.character = character;
        this.element = element;
        this.increasedSecurity = false;
        this.currentDirection = "";
    }

    moveToSide() {
        let speedCoefficient = this.increasedSecurity ? 1250 : 250;
        let transitionDuration = this.currentDirection === "left" ? this.element.offsetLeft / speedCoefficient : (window.innerWidth - 50 - this.element.offsetLeft) / speedCoefficient;

        this.element.style.transition = `${transitionDuration}s left linear`;
        if(this.currentDirection === "left") {
            this.element.style.left = 10;
        } else if (this.currentDirection === "right") {
            this.element.style.left = window.innerWidth - 50;
        }

        
    }

    increaseSecurity() {
        this.increasedSecurity = true;
    }

    setTopOffset(offset) {
        this.element.style.top = offset;
    }

    setLeftOffset(offset) {
        this.element.style.left = offset;
    }

    setDirection(direction) {
        this.currentDirection = direction;
    }

    resetPosition(){
        let rowSeed = Math.random() * 3;

        if(rowSeed < 1) {
            this.setTopOffset(10);
        } else if (rowSeed < 2) {
            this.setTopOffset(60);
        } else if (rowSeed < 3) {
            this.setTopOffset(110);
        }

        let leftOffset = Math.floor(Math.random() * window.innerWidth);
        this.setLeftOffset(leftOffset);

        let direction = Math.floor(Math.random() * 3) > 1 ? "left" : "right";
        this.setDirection(direction);
        this.moveToSide();
    }
}