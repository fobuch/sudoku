let board = createBoard();
//console.log(howManyDivides(9,9));

const cellMini = document.querySelectorAll('.cell-mini');
const numpad = document.querySelectorAll('.numpad');

let activeCell = 40;
activeCellBackground(activeCell, true);

cellMini.forEach(cell => {
    cell.addEventListener('click', () => {
        let id = parseInt(cell.id.slice(1));
        //document.getElementById('c'+activeCell).style.backgroundColor = '';
        activeCellBackground(activeCell, false);
        activeCell = id;
        activeCellBackground(activeCell, true);
      });
});

numpad.forEach(num => {
    num.addEventListener('click', function handleClick(event) {
        let numId = parseInt(num.id.slice(11));
        document.getElementById('c' + activeCell).innerText = numId;
        board[activeCell] = numId;
    });
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
    if(option) color = 'lightgray';

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
            console.log(i);
        }
    }

    if(option){
        document.getElementById('c' + cellId).style.backgroundColor = 'gray';
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