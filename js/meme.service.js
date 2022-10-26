'use strict'

let gImgs = []

let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Text goes here',
        size: 40,
        align: 'center',
        color: 'white'
    }]
}

let gIsDrag

function createImages(){
    for(let i = 0; i < 18; i++){
        gImgs[i] = { id: +`${i+1}`, url: `img/${i+1}.jpg`, keywords: ['funny', 'cat'] }
    }
}

// function loadMyMemes(){
//     gImgs  = loadFromStorage(MEMES_KEY)
// }


// function isLineClicked(clickedPos) {
//     gIsDrag = gMeme.lines.indexOf(({ pos, size }) =>
//     ((clickedPos.x >= pos.x && clickedPos.x <= pos.x + pos.width && (clickedPos.y >= pos.y - size && (clickedPos.y <= pos.y)))))
//     console.log(gIsDrag)
// }

// function moveLine(dx, dy) {
//     gMeme.lines[gIsDrag].pos.x += dx
//     gMeme.lines[gIsDrag].pos.y += dy
// }

// function getIsDrag() {
//     return gIsDrag
// }

// function setLineDrag(isDrag) {
//     gIsDrag = isDrag
// }

function setLinePos(pos, lineIdx) {
    gMeme.lines[lineIdx].pos = pos
}

function setTxt(lineIdx, txt) {
    gMeme.lines[lineIdx].txt = txt
}
function setTxtAlign(lineIdx, direction) {
    gMeme.lines[lineIdx].align = direction
}

function setTxtSize(lineIdx, action) {
    gMeme.lines[lineIdx].size += action
}

function setTxtColor(lineIdx, color) {
    gMeme.lines[lineIdx].color = color
}

function deleteLine(lineIdx) {
    gMeme.lines.splice(lineIdx, 1)
}

function addLine() {
    gMeme.lines.push({
        txt: 'Text goes here',
        size: 40,
        align: 'center',
        color: 'white'
    }
    )
}

function setMeme(id) {
    gMeme.selectedImgId = id
}

function getMeme() {
    return gMeme
}


function getImgs() {
    return gImgs
}

function getImgUrlById(id) {
    let { url } = gImgs.find(img => img.id === id)
    return url
}