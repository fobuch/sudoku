let board = createBoard();

const cellMini = document.querySelectorAll('.cell-mini');
const numpad = document.querySelectorAll('.numpad');

let activeCell = 0;
activeCellBackground(activeCell, true);

cellMini.forEach(cell => {
    cell.addEventListener('click', () => {
        let id = parseInt(cell.id.slice(1));
        
        activeCellBackground(activeCell, false);
        activeCell = id;
        activeCellBackground(activeCell, true);
      });
});

numpad.forEach(num => {

    num.addEventListener('click', () => {
        let numId = parseInt(num.id.slice(11));
        if (numId == 0) {
            document.getElementById('c' + activeCell).innerText = '';
            board[activeCell] = 0;
            console.log(board);
        } else {
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
<<<<<<< Updated upstream
}
=======
}

function solveBoard(){

}

function fillBoard(){
    let line = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let i = 0; i < 9; i++){
        line = lineShuffle(line);
        board[i] = line;
    }
    //lineShuffle(line);
    console.log(board);
}
fillBoard();

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
>>>>>>> Stashed changes
