//core//
const Fleet = require ("./Fleet.js")

const boardSize = 10; //board size is always a square, 10 means 10x10 grid; global var
let hitCount = 0;
let missCount = 0;
let shotCount = 0;
let numberOfEnemyGrid = 0;
let kapal = new Fleet();
let board = fillEnemies(generateBoard(), kapal); //global variable
//end of globals initialization

////////////====HOW TO PLAY====////////////
//input parameter of any number between 1 to 100 in the gameStart function
//parameter input is how many shots you have
//INPUT THE PARAMETER THROUGH PROCESS ARGV 
//for example, in terminal, type "node index.js 20" for 20 shots
//every shots is randomized, and will not hit the same place twice
//game ends when you ran out of shots OR all ships are sunk
///////////////////////////////////////////
gameStart(parseInt(process.argv[2]));

//MAIN FUNCTION/ENTRY POINT IS HERE//
function gameStart(ammoCount){
    if (ammoCount < 1 || ammoCount > (boardSize * boardSize) || typeof ammoCount !== 'number' || isNaN(ammoCount)){
        return console.log("Invalid number of shots input, please put valid number of shots");
    }

    printBoard();
    for (let i = 0; i < ammoCount; i++){
        sleep(500);
        console.clear();
        shoot();
        if (hitCount >= numberOfEnemyGrid){
            console.log(`All enemy ships is sunk, you win!`);
            break;
        }
    }

    if (hitCount < numberOfEnemyGrid){
        console.log(`You ran out of ammunition, game over!`)
    }
    console.log(`Out of ${shotCount} shots, you missed ${missCount} times!`);
}

function printBoard(){
    console.log("--------------------------------------");
    for (let i = 0; i < boardSize; i++){
        console.log(board[i].join(" | "));
        console.log("--------------------------------------");
    }
}
//console.log (board.join("\r\n"));

function generateBoard (){ //generates board in form of 2d Array
    let grid = [];
    for (let i = 0; i < boardSize; i++){
        grid.push([]);
        for (let j = 0; j < boardSize; j++){
            grid[i].push(" ");
        }
    }
    return grid;
} //returns empty grid/board

function fillEnemies(inputGrid, fleet){ //fills enemies in the generated board
    let grid;
    let enemyCount = fleet.countTotalShip();
    let filled = false;
    while (filled === false){
        filled = true;
        grid = inputGrid.slice(0);
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
                
                if (validLocationArr.length < 1){ //to make sure all ships can be placed
                    filled = false; // this safeguard is for cases of no possible location
                }                   //will restart the whole process from empty grid
                
                //code below randomly choose 1 of the possible location as index of coord arr
                let chosenCoordinate = Math.floor(Math.random() * validLocationArr.length);
                //code below places the actual ship on the chosen coord
                for (let v = 0; v < fleet[ship].shipLength; v++){
                    if (horizontalPlacement){
                        grid[validLocationArr[chosenCoordinate][0]][validLocationArr[chosenCoordinate][1]] = fleet[ship].shipCode;
                        validLocationArr[chosenCoordinate][1]++;
                    } else{
                        grid[validLocationArr[chosenCoordinate][0]][validLocationArr[chosenCoordinate][1]] = fleet[ship].shipCode;
                        validLocationArr[chosenCoordinate][0]++;
                    }
                    numberOfEnemyGrid++;
                }
            }
        }
    } //end of while loop (just a safeguard if in case there board can't be filled with next ship)
    return grid;
} //returns board already filled with the enemies defined in Fleet class

function shoot(){
    let alreadyShot = false;
    while (alreadyShot === false){
        let verticalCoord = Math.floor(Math.random()*boardSize);
        let horizontalCoord = Math.floor(Math.random()*boardSize);
        console.clear();
        switch (board[verticalCoord][horizontalCoord]) {
            case " ":
                console.log("You missed your shot!");
                board[verticalCoord][horizontalCoord] = "/";
                missCount++;
                alreadyShot = true;
                break;
            case "D":
                console.log("You hit a Destroyer!");
                board[verticalCoord][horizontalCoord] ="x";
                hitCount++;
                alreadyShot = true;
                break;
            case "C":
                console.log("You hit a Cruiser!");
                board[verticalCoord][horizontalCoord] = "x";
                hitCount++;
                alreadyShot = true;
                break;
            case "B":
                console.log("You hit a Battleship!");
                board[verticalCoord][horizontalCoord] = "x";
                hitCount++;
                alreadyShot = true;
                break;
            case "V":
                console.log("You hit an Aircraft Carrier!");
                board[verticalCoord][horizontalCoord] = "x";
                hitCount++;
                alreadyShot = true;
                break;
            default:
                break;
        }     
        printBoard();
    }
    shotCount++;
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