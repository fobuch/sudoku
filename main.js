let board = createBoard();
console.log(board);
let line = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let difficulty;
difficulty = document.getElementById("difficulty");
let btimer = false;

const cellMini = document.querySelectorAll('.cell-mini');
const numpad = document.querySelectorAll('.numpad');

let activeCell = 0;
activeCellBackground(activeCell, true);

cellMini.forEach(cell => {
    cell.addEventListener('click', () => {
        let id = parseInt(cell.id.slice(1));
        if(!btimer){
            btimer = true;
            timer();
        }
        activeCellBackground(activeCell, false);
        activeCell = id;
        activeCellBackground(activeCell, true);
        console.log(activeCell);
      });
});

numpad.forEach(num => {

    num.addEventListener('click', () => {
        let numId = parseInt(num.id.slice(11));
        if (numId == 0) {
            document.getElementById('c' + activeCell).innerText = '';
            board[activeCell] = 0;
            console.log(board);
        }else if(numId == 10){
            newGame();
        }
         else {
            document.getElementById('c' + activeCell).innerText = numId;
            board[activeCell] = numId;
        }
    });
});

document.addEventListener('keydown', function handleKeyPress(event) {
    if(Number(event.key) > 0 && Number(event.key) <= 9){
        document.getElementById('c'+activeCell).innerText = event.key;
        board[activeCell] = Number(event.key);
        console.log(board);
    }else if(event.key == 'Backspace'){
        document.getElementById('c'+activeCell).innerText = '';
        board[activeCell] = 0;
        console.log(board);
    }
});

function timer(){
    let minutes=0;
    let seconds=0;
    if(btimer){
        let timer = setInterval(function() {
            
            seconds++;
            if(seconds>59){
                seconds=0;
                minutes++;
            }
        
            if(seconds <10){
                document.getElementById("timer").innerHTML = minutes + ":0"+ seconds;
            }else{
                document.getElementById("timer").innerHTML = minutes + ":"+ seconds;
            }
        }, 1000);
    }
}


function createBoard(){
    let returnBoard = [];
    for(let i = 0; i < 81; i++){
        returnBoard[i] = 0;
    }
    return returnBoard;
}

function activeCellBackground(cellId, option){
    let color = '';
    if(option) color = 'rgb(225, 225, 225)';

    let cellIdCopy = cellId;
    while(cellIdCopy <= 80){
        document.getElementById('c'+cellIdCopy).style.backgroundColor = color;
        cellIdCopy += 9;
    }

    cellIdCopy = cellId;
    while(cellIdCopy >= 0){
        document.getElementById('c'+cellIdCopy).style.backgroundColor = color;
        cellIdCopy -= 9;
    }

    for(let i = cellId - (cellId % 9); i <= cellId - (cellId % 9) + 8; i++){
        document.getElementById('c'+i).style.backgroundColor = color;
    }

    for(let j = cellId - (howManyDivides(cellId,9) % 3) * 9; j < (cellId - (howManyDivides(cellId,9) % 3) * 9) + 27; j += 9){
        for(let i = j - (j % 3); i < j - (j % 3) +3; i++){
            document.getElementById('c'+i).style.backgroundColor = color;
        }
    }

    if(option){
        document.getElementById('c' + cellId).style.backgroundColor = 'rgb(165, 165, 165)';
    }else{
        document.getElementById('c' + cellId).style.backgroundColor = '';
    }
    
    
}

function howManyDivides(number, divider){
    let counter = 0;
    let outcome = number - divider;

    while(outcome >= 0){
        counter++;
        outcome -= divider;
    }

    return counter;
}

function solveBoard(){

}

function fillBoard(){
    let startTime = performance.now();
    let counter = 0;
    // let eraseCounter = 0;
    let lineErase = [0,0,0,0,0,0,0,0,0];
    let zero = board.indexOf(0);
    while(zero >= 0){
        
        board[zero] = getRandomInt(1,10);
        let checkZero = checkAll(zero);
        while(!checkZero){
            board[zero] = getRandomInt(1,10);
            
            checkZero = checkAll(zero);
            counter++;
            if(counter > 10){
                
                // if(eraseCounter > 5){
                //     for(let i = 0; i < 81; i++){
                //         board[i] = 0;
                //     }
                //     fill3diagonal();
                //     console.log('Zresetowano plansze');
                // }else{
                //     for(let i = howManyDivides(zero, 9) * 9; i < howManyDivides(zero, 9) * 9 + 9; i++){
                //         board[i] = 0;
                //     }
                //     console.log('Zresetowano linie');
                // }
                for(let i = howManyDivides(zero, 9) * 9; i < howManyDivides(zero, 9) * 9 + 9; i++){
                    board[i] = 0;
                }
                break;
            }
            //console.log('zero: ' + zero + ' counter: ' + counter);
            
        }
        let endTime = performance.now();
        if(endTime - startTime > 400){
            startTime = performance.now();
            for(let i = 0; i < 81; i++){
                board[i] = 0;
            }
            fill3diagonal();
        }
        console.log(`Fill board took ${endTime - startTime} milliseconds`);
        zero = board.indexOf(0);
        counter = 0;
        
    }
    
    
}





function checkAll(cellMiniNo){
    let columnNo = cellMiniNo%9;
    let lineNo = howManyDivides(cellMiniNo,9);
    

    if(checkArray(getLine(lineNo)) 
        && checkArray(getColumn(columnNo)) 
        && checkArray(getBigCell(cellMiniNo))){
            return true;
        }
    else{
        return false;
    }
}

function checkArray(entity){
    
    

    let entityNoZero = [];
    for(let i = 0; i < entity.length; i++){
        if(entity[i] != 0) entityNoZero.push(entity[i]);
    }

    let entityCopy = entityNoZero;
    
    let inEntity = [];
    for(let j = 0; j < entityCopy.length; j++){
        if(inEntity.indexOf(entityCopy[j]) >= 0) return false;
        else inEntity.push(entityCopy[j]);
    }

    return true;
}

function getColumn(columnNo){
    let returnColumn = [];
    for(let i = 0; i < 9; i++){
        returnColumn[i] = board[columnNo + i * 9];
    }
    return returnColumn ;
}


function getLine(lineNo){
    let returnLine = [];
    for(let i = 0; i < 9; i++){
        returnLine[i] = board[i + lineNo * 9];
    }
    return returnLine;
}


function getBigCell(cellId){
    let returnLine = [];
    let counter = 0;
    for(let j = cellId - (howManyDivides(cellId,9) % 3) * 9; j < (cellId - (howManyDivides(cellId,9) % 3) * 9) + 27; j += 9){
        for(let i = j - (j % 3); i < j - (j % 3) +3; i++){
            returnLine[counter] = board[i];
            counter++;
        }
    }
    return returnLine;
}



function lineShuffle(line){
    let lineCopy = line;
    let tempLine = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(let i = 0; i < 9; i++){
        let rndNum = getRandomInt(0, lineCopy.length);
        tempLine[i] = lineCopy[rndNum];
        lineCopy.splice(rndNum, 1);
    }
    return tempLine;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


function setCells(){
    for(let i = 0; i < 81; i++){
        document.getElementById('c'+i).innerText = board[i];
    }
}

function fill3diagonal(){
    // for(let k = 0; k < 3; k++){
    //     let linec = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //     let lineCopy = linec;
    //     lineCopy = lineShuffle(lineCopy);
    //     for(let j = 0+k*30; j < 27+k*30; j += 9){
    //         for(let i = 0; i < 3; i++){
    //             board[j+i] = lineCopy[0];
    //             lineCopy.splice(0,1);
    //         }
    //     }
    // }


    for(let k = 0; k < 1; k++){
        let linec = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let lineCopy = linec;
        lineCopy = lineShuffle(lineCopy);
        for(let j = 0+k*30; j < 27+k*30; j += 9){
            for(let i = 0; i < 3; i++){
                board[j+i] = lineCopy[0];
                lineCopy.splice(0,1);
            }
        }
    }
}

function newGame(){
    let pools = 0;
    let pool;
    setCells();
    if(difficulty.value=="Easy"){
        pools = 20;
    }else if(difficulty.value=="Medium"){
        pools = 42;
    }else if(difficulty.value=="Hard"){
        pools = 66;
    }else{
        console.log("Congrats. You broke it. FUDGE.");
    }
    while(pools>0){
        pool = Math.floor((Math.random()*81));
        if(document.getElementById('c'+ (pool)).innerText != ""){
            document.getElementById('c'+(pool)).innerText = "";
            pools--;
        }
    }
}


fill3diagonal();

fillBoard();

setCells();
