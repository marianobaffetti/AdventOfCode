class Santa {

    constructor() {
        this.floor = 0;
    }

    goTo(directions) {
        [...directions].forEach(direction => this.move(direction));

        return this.floor;
    }

    move(direction) {
        if(direction == '('){
            this.floor++;
        } else {
            this.floor--;
        }
    }

    firstPositionToBasement(directions) {
        let counter = 0;

        [...directions].find((direction, index) => {
            this.move(direction);

            counter = index + 1;
            return this.floor === -1;
        })

        return counter;
    }
    
}
module.exports = Santa;