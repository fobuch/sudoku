const cellMini = document.querySelectorAll('.cell-mini');

cellMini.forEach(cell => {
    cell.addEventListener('click', function handleClick(event) {
        console.log('cell clicked', event);
    
        cell.setAttribute('style', 'background-color: yellow;');
      });
});