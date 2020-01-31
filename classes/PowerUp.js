class PowerUp {

    constructor(element, type) {
        this.element = element;
        this.type = type;
        this.timer = null;

        this.transition = "5s top linear";
        this.falling = false;
        this.transitionStates = {
            animated: "5s top linear",
            instant: "0s top"
        }
    }

    changeTransition(instant) {
        this.element.style.transition = instant ? this.transitionStates.instant : this.transitionStates.animated;
    }

    getTopOffSet() {
        return this.element.offsetTop;
    }

    setPositionY(top) {
        if(top) {
            this.changeTransition(true);
            this.element.style.top = -40;
        } else {
            this.changeTransition(false);
            this.element.style.top = window.innerHeight + 40;
        }
    }

    setLeftOffset(offset) {
        this.element.style.left = offset;
    }
    
    setPositionX() {
        let leftOffset = Math.floor(Math.random() * window.innerWidth);
        if (leftOffset - 75 < 0) {
            leftOffset = leftOffset + 85;
        }

        if (leftOffset + 75 > window.innerWidth) {
            leftOffset = leftOffset - 85;
        }

        this.setLeftOffset(leftOffset);
    }

    startTimer() {
        let randomSeconds = Math.floor(Math.random() * 20) * 1000;
        this.timer = setTimeout(() => {
            this.setPositionY(false);
            this.falling = true;
        }, randomSeconds);
    }

    stopTimer() {
        clearTimeout(this.timer);
    }
}