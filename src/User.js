class User {

    constructor(name, legs, color, friends) {
        this.name = name;
        this.legs = legs;
        this.color = color;
        if(typeof friends !== "undefined"){
            this.friends = friends;
        }
        else{
            this.friends = [];
        }
    }
}

module.exports = User;