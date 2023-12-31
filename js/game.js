var glevel={
    size:4,
    mines:2
}
var gGame={
    isON:false,
    shownCount:0,
    markedCount:0,
    secsPassed:0,
    life:3
}
var gBoard

function onInit(){
    gGame.isON=true
    gBoard=createBoard()
    renderMines()
    setMineNegsCount()
renderBoard(gBoard)

}

function createBoard(){
    var board=[]
    for(i=0;i<glevel.size;i++){
        board.push([])
        for(j=0;j<glevel.size;j++){
            var CellObj={
                minesAroundCount:0,
                isShown:false,
                isMine:false,
                isMarked:false,
           isExplode:false
            }
            board[i].push(CellObj)
        }
    

    }

    return board
}

function setMineNegsCount(){
    for (var i = 0; i < glevel.size; i++) {
        for (var j = 0; j < glevel.size; j++) {
            
            // if(gBoard[width][height].isMine===true) continue
            var count = 0
            for (var indexWidth = i - 1; indexWidth <= i + 1; indexWidth++) {
                if(indexWidth === -1 || indexWidth > glevel.size - 1) continue;
                for (var indexHeight = j - 1; indexHeight <= j + 1; indexHeight++) {
                    if(indexHeight === -1 || indexHeight > glevel.size - 1) continue;
                   
                    if(gBoard[indexWidth][indexHeight].isMine===true) count++
                }
                
            }
            gBoard[i][j].minesAroundCount = count;
        
    }
}
}

function onCellClicked(elCell, i,j,ev){
 
    if(gBoard[i][j].isMarked || !gGame.isON) return 

    if(gBoard[i][j].isMarked || gBoard[i][j].isShown)return

    if (gBoard[i][j].isMine===true) {
        gGame.life--
        if(gGame.life>=0) {
            gBoard[i][j].isExplode=true
            renderBoard(gBoard)}
        else if(gGame.life<0)onBlowUp()
       
        return}

       
        if(gBoard[i][j].minesAroundCount>0) {
            gBoard[i][j].isShown=true
            gGame.shownCount++
         
            }

        else if (gBoard[i][j].minesAroundCount===0) {
            for (var indexWidth = i - 1; indexWidth <= i + 1; indexWidth++) {
        if(indexWidth === -1 || indexWidth > glevel.size - 1) continue;
        for (var indexHeight = j - 1; indexHeight <= j + 1; indexHeight++) {
            if(indexHeight === -1 || indexHeight > glevel.size - 1) continue;
            gBoard[indexWidth][indexHeight].isShown=true
        
        }}}
        checkVictory()
renderBoard(gBoard)

}

function checkCellN(i,j){

    for (var indexWidth = i - 1; indexWidth <= i + 1; indexWidth++) {
        if(indexWidth === -1 || indexWidth > glevel.size - 1) continue;
        for (var indexHeight = j - 1; indexHeight <= j + 1; indexHeight++) {
            if(indexHeight === -1 || indexHeight > glevel.size - 1) continue;
            if(gBoard[indexHeight][indexWidth].isMine){
console.log((gBoard[indexHeight][indexWidth]));
return false
            }

            
}}
return true
}

function onRightClick(elCell, i,j){
    if(!gGame.isON) return
var element=document.querySelector(`.cell-${i}-${j}`)

    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
    console.log(i);
    
    if(gBoard[i][j].isMarked){
        element.innerText=''
        gGame.markedCount--
        gBoard[i][j].isMarked=false
    }
    else{
        if(gBoard[i][j].isShown || gGame.markedCount===glevel.mines)return

        element.innerText='f'
        gGame.markedCount++
        gBoard[i][j].isMarked=true
        checkVictory()
    }

}

function onBlowUp(){
   gGame.isON=false
    for(var i=0;i<glevel.size;i++){
        for(var j=0;j<glevel.size;j++){
            console.log('a');
            if (gBoard[i][j].isMine===true){
                gBoard[i][j].isShown=true
             
            }
        }

    }
    renderBoard(gBoard)
}

function renderMines(){
    for(i=0;i<glevel.mines;i++){
      var cell=  gBoard[getRandomIntInclusive(0,glevel.size-1)][getRandomIntInclusive(0,glevel.size-1)]
  cell.isMine=true
    }

}

function checkVictory(){
   
    var count=0
  
  for(var i=0;i<glevel.size;i++){
   
   for (var j=0;j<glevel.size;j++){
    if(gBoard[i][j].isShown===true  || gBoard[i][j].isMarked===true) count++
    
   }
   if(count===16){
   gGame.isON===false
  alert('you won')}
  }
  
}

function onChangeLevel(level){
    switch (level) {
        case 'beginner':
            glevel.size=4
            glevel.mines=3
            onInit()
            break;
            case 'medium':
                glevel.size=16
                glevel.mines=40
                onInit()
                break;
                case 'expert':
                    glevel.size=17
                    glevel.mines=50
                    onInit()
                    break;
        default:
            break;
    }
}