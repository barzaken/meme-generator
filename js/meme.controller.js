'use strict'

let gElCanvas
let gCtx
let gCurrLine = 0
let gCurrLinesLength
let gStartPos
let gUploadSrc

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function renderMeme(savedMeme) {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    // addListeners()

    //Get Meme Object
    let meme = savedMeme || getMeme()

    //Get & Draw Meme image
    let img = new Image()
    img.src = gUploadSrc || getImgUrlById(meme.selectedImgId)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    //Render lines
    meme.lines.forEach((line, idx) => drawText(line, idx))
    showEditor(meme)
    gCurrLinesLength = meme.lines.length
}

function drawText({ txt, size, align, color, pos, font }, idx) {
    if (!txt) return
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align

    gCtx.fillText(txt, pos.x, pos.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, pos.x, pos.y) // Draws (strokes) a given text at the given (x, y) position.
    drawTextBorder()
}

function drawTextBorder() {
    let currLine = getMeme().lines[gCurrLine]
    gCtx.font = `${currLine.size}px ${currLine.font}`

    let lineWidth = gCtx.measureText(currLine.txt).width
    let lineHeight = gCtx.measureText(currLine.txt).fontBoundingBoxAscent

    gCtx.strokeStyle = 'yellow'
    gCtx.strokeRect(currLine.pos.x - (lineWidth/2),currLine.pos.y - lineHeight-10, currLine.pos.x+lineHeight, currLine.pos.y+10)
}

function onChangeFont(font) {
    setFont(gCurrLine, font)
    renderMeme()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        gUploadSrc = event.target.result
        // Run the callBack func, To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}


function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function saveMeme() {
    let meme = getMeme()
    let myMemes = loadFromStorage(MEMES_KEY) || []
    myMemes.push(meme)
    saveToStorage(MEMES_KEY, myMemes)
}

function onSwitchLine() {
    (gCurrLine < gCurrLinesLength - 1) ? gCurrLine++ : gCurrLine = 0
    renderMeme()
}

function onDeleteLine() {
    deleteLine(gCurrLine)
    gCurrLine--
    renderMeme()
}
function onAddLine() {
    addLine()
    gCurrLine++
    renderMeme()
}

function onLineHeight(action) {
    changeLineHeight(gCurrLine, action)
    renderMeme()
}

function onSetTxt(txt) {
    setTxt(gCurrLine, txt)
    renderMeme()
}

function onTxtAlign(direction) {
    setTxtAlign(gCurrLine, direction)
    renderMeme()
}

function onSetTxtSize(action) {
    setTxtSize(gCurrLine, action)
    renderMeme()
}

function onSetTxtColor(color) {
    setTxtColor(gCurrLine, color)
    renderMeme()
}

function showEditor(meme) {
    let elEditor = document.querySelector('.editor-container')
    elEditor.classList.remove('hide')
}

function hideEditor() {
    let elEditor = document.querySelector('.editor-container')
    elEditor.classList.add('hide')
}