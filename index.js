//core//
//due to the scope of the app, each ships does not need each class,
//since the traits relevant is the length, and quantity deployed in fleet
class fleet { 
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
//GLOBALS//
let kapal = new fleet();
let board = generateBoard();
console.log(kapal.countTotalShip());
console.log(fillEnemies(board, kapal));

 

function generateBoard (){ //generates board in form of 2d Array
    const boardSize = 10; //board size is always a square, 10 means 10x10 grid
    let grid = [];
    for (let i = 0; i < boardSize; i++){
        grid.push([]);
        for (let j = 0; j < boardSize; j++){
            grid[i].push(" ");
        }
    }
    return grid;
}

function fillEnemies(board, fleet){ //fills enemies in the generated board
    let grid;
    let enemyCount = fleet.countTotalShip();
    let filled = false;
    while (filled === false){
        filled = true;
        grid = board.slice(0);
        for (let ship in fleet){
            for (let i = 0; i < fleet[ship].quantity; i++){//loop deciding quantity placed
                let validLocationArr = [];
                let horizontalPlacement = Math.floor(Math.random()*2);//ship orientation
                for (let j = 0; j < grid.length; j++){ //grid traversal loops
                    for (let k = 0; k < grid[j].length; k++){ //horizontal traversal loops
                        //these traversal loops check "origin coordinates" used for base
                        //ifs and loops below will decide if the blocks starting from the base
                        //is an empty block valid for placement or not
                        if (horizontalPlacement){
                            let canPlaceHere = true;
                            for (let shipLengthCheck = k; shipLengthCheck < fleet[ship].shipLength+k; shipLengthCheck++){
                                if (grid[j][shipLengthCheck] !== " "){
                                    canPlaceHere = false;
                                    break;
                                }
                            }
                            if (canPlaceHere){
                                validLocationArr.push([[j],[k]]);
                            }
                        } else { //CHECKING VERTICAL PLACEMENT POSSIBILITY
                            let canPlaceHere = true;
                            for (let shipLengthCheck = j; shipLengthCheck < fleet[ship].shipLength+j; shipLengthCheck++){
                                if (shipLengthCheck >= 10){
                                    canPlaceHere = false;
                                    break;
                                }
                                if (grid[shipLengthCheck][k] !== " "){
                                    canPlaceHere = false;
                                    break;
                                } 
                            }
                            if (canPlaceHere){
                                validLocationArr.push([[j],[k]]);
                            }
                        } //END OF BASE POSSIBLE SPACES LOOPS
                    }
                }
                if (validLocationArr.length < 1){
                    filled = false;
                }
                let chosenCoordinate = Math.floor(Math.random() * validLocationArr.length);
                for (let v = 0; v < fleet[ship].shipLength; v++){
                    if (horizontalPlacement){
                        grid[validLocationArr[chosenCoordinate][0]][validLocationArr[chosenCoordinate][1]] = fleet[ship].shipCode;
                        validLocationArr[chosenCoordinate][1]++;
                    } else{
                        grid[validLocationArr[chosenCoordinate][0]][validLocationArr[chosenCoordinate][1]] = fleet[ship].shipCode;
                        validLocationArr[chosenCoordinate][0]++;
                    }
                }
                console.log(grid.join("\r\n"))
                console.log("=======")
            }
        }
    }
}




//Utilities below here
function sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
        }
    }
}
//console.clear(); //for clearing console