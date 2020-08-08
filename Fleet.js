//due to the scope of the app, each ships does not need each class,
//since the traits relevant is the length, and quantity deployed in fleet
class Fleet { 
    constructor(){
        this._destroyer = {
            shipLength: 2,
            quantity: 1,
            shipCode: "D"
        };
        this._cruiser = {
            shipLength: 3,
            quantity: 1,
            shipCode: "C"
        };
        this._battleship = {
            shipLength: 4,
            quantity: 1,
            shipCode: "B"
        };
        this._carrier=  {
            shipLength: 5,
            quantity: 1,
            shipCode: "V"
        };
    }
    countTotalShip(){ //counts total ship in current fleet obj
        let output = 0;
        for (let property in this){
            output += this[property].quantity;
        }
        return output;
    }
}

module.exports = Fleet;