'use strict'

function renderBoard(mat) {
    if(gGame.isON){
     var  elFace=  document.querySelector('.faceimg')
     console.log(elFace);
     elFace.src='images/normal.jpeg'
    }

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            var cell=''
             
            
              if(gBoard[i][j].isShown && !gBoard[i][j].isMine)   cell=gBoard[i][j].minesAroundCount
             else if(gBoard[i][j].isShown && gBoard[i][j].isMine ||  (gBoard[i][j].isExplode))  cell='<img class="img" src="images/mine.jpeg" alt="">'
             else if(!gBoard[i][j].isShown && gBoard[i][j].isMarked) cell='f'
          
         // else if(mat[i][j].isMine===true) cell='m'

            const className = `cell cell-${i}-${j}`

            strHTML += `<td>
            <button class="${className}" onclick="onCellClicked(this, ${i},${j})" oncontextmenu="onRightClick(this, ${i},${j})">
        ${cell}
            </button>
            </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    
    const elContainer = document.querySelector('.gameplay')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
   
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    // const elCell = document.querySelector(`[data-i="${location.i}"][data-j="${location.j}"]`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
