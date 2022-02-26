let code = "";
let temp = 0;
let temp2 = 0;
for(let i = 1; i < 4; i++){
    code += `<tr class="line" id="line${i}">`;
    for(let j = 1; j < 4; j++){
        code += `<td class="cell" id="cell${j}">`;
        code += '<table class="table-mini">';
        for(let k = 1; k < 4; k++){
            code += `<tr class="line-mini" id="line-mini${k}">`;
            for(let l = 0; l < 3; l++){
                code += `<td class="cell-mini" id="c${l+temp2+temp}"></td>`
            }
            temp2 += 9;
            code += '</tr>';
        }
        temp += 3;
        temp2 = 0;
        code += '</table>';
        code += '</td>';
    }
    temp += 18;
    code += '</tr>'
}

document.getElementById('board').innerHTML = code;