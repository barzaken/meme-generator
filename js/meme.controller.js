'use strict'
let gElCanvas
let gCtx
let gCurrLine = 0
let gCurrLinesLength

function renderMeme(id) {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    //Get Meme Object
    let meme = getMeme()

    //Get & Draw Meme image
    let img = new Image()
    img.src = getImgUrlById(meme.selectedImgId)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    //Render lines
    meme.lines.forEach(line => drawText(line))
    gCurrLinesLength = meme.lines.length
}

function drawText({txt,size,align,color}) {
    if(!txt) return
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black' 
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial` 
    gCtx.textAlign = align 

    gCtx.fillText(txt, 50, 100) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, 50, 100) // Draws (strokes) a given text at the given (x, y) position.
}




function onSwitchLine(){
    (gCurrLine < gCurrLinesLength-1) ? gCurrLine++ : gCurrLine = 0
}

function onDeleteLine(){
    deleteLine(gCurrLine)
    gCurrLine--
    renderMeme() 
}
function onAddLine(){
    addLine()
    gCurrLine++
    renderMeme() 
}

function onSetTxt(txt){
    setTxt(gCurrLine,txt)
    renderMeme()
}

function onTxtAlign(direction){
    setTxtAlign(gCurrLine,direction)
    renderMeme()
}

function onSetTxtSize(action){
    setTxtSize(gCurrLine,action)
    renderMeme()
}

function onSetTxtColor(color){
    setTxtColor(gCurrLine,color)
    renderMeme()
}

function showEditor() {
    let elEditor = document.querySelector('.editor-container')
    elEditor.classList.remove('hide')
}

function hideEditor() {
    let elEditor = document.querySelector('.editor-container')
    elEditor.classList.add('hide')
}