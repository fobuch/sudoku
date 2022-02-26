let code = "";

for(let i = 1; i < 4; i++){
    code += `<tr class="line" id="line${i}">`;
    for(let j = 1; j < 4; j++){
        code += `<td class="cell" id="cell${j}">`;
        code += '<table class="table-mini">';
        for(let k = 1; k < 4; k++){
            code += `<tr class="line-mini" id="line-mini${k}">`;
            for(let l = 1; l < 4; l++){
                code += `<td class="cell-mini" id="cell-mini${l}"></td>`
            }
            code += '</tr>';
        }
        code += '</table>';
        code += '</td>';
    }
    code += '</tr>'
}

document.getElementById('board').innerHTML = code;