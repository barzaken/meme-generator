'use strict'

let gElCanvas
let gCtx
let gCurrLine = 0
let gCurrLinesLength
let gStartPos


const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function renderMeme(savedMeme) {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    // addListeners()

    //Get Meme Object
    let meme = savedMeme || getMeme()

    //Get & Draw Meme image
    let img = new Image()
    img.src =  getImgUrlById(meme.selectedImgId) 
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    //Render lines
    meme.lines.forEach((line, idx) => drawText(line, idx))
    showEditor(meme)
    gCurrLinesLength = meme.lines.length
}

function drawText({ txt, size, align, color,pos }, idx) {
    if (!txt) return
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align
    console.log(pos)

    pos = { x: pos.x , y: pos.y , width: gCtx.measureText(txt).width }

    gCtx.fillText(txt, pos.x, pos.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, pos.x, pos.y) // Draws (strokes) a given text at the given (x, y) position.
}

function downloadImg(elLink) {
    console.log('first')
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    console.log(imgContent)
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

// function onMove(ev) {
//     const isDrag = getIsDrag()
//     if (!isDrag) return
//     const pos = getEvPos(ev)
//     //Calc the delta , the diff we moved
//     const dx = pos.x - gStartPos.x
//     const dy = pos.y - gStartPos.y
//     moveLine(dx, dy)
//     //Save the last pos , we remember where we`ve been and move accordingly
//     gStartPos = pos
//     //The canvas is render again after every move
//     renderMeme()
// }

// function onDown(ev) {
//     const pos = getEvPos(ev)
//     if (!isLineClicked(pos)) return
//     setLineDrag(true)
//     //Save the pos we start from 
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'
// }

// function onUp() {
//     setLineDrag(false)
//     document.body.style.cursor = 'grab'
// }





function saveMeme(){
    let meme = getMeme()
    let myMemes = loadFromStorage(MEMES_KEY) || []
    myMemes.push(meme)
    saveToStorage(MEMES_KEY, myMemes) 
}

function onSwitchLine() {
    (gCurrLine < gCurrLinesLength - 1) ? gCurrLine++ : gCurrLine = 0
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

function onLineHeight(action){
    changeLineHeight(gCurrLine,action)
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

// function getEvPos(ev) {

//     //Gets the offset pos , the default pos
//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     // Check if its a touch ev
//     if (TOUCH_EVS.includes(ev.type)) {
//         //soo we will not trigger the mouse ev
//         ev.preventDefault()
//         //Gets the first touch point
//         ev = ev.changedTouches[0]
//         //Calc the right pos according to the touch screen
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
//         }
//     }
//     return pos
// }


// function addListeners() {
//     addMouseListeners()
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

function showEditor(meme) {
    let elEditor = document.querySelector('.editor-container')
    elEditor.classList.remove('hide')
}

function hideEditor() {
    let elEditor = document.querySelector('.editor-container')
    elEditor.classList.add('hide')
}