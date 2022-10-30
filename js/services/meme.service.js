'use strict'

let gImgs = []
const IMGS_KEY = 'memesImgs'
const MEMES_KEY = 'myMemes'


let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Upper goes here',
        size: 25,
        align: 'center',
        color: 'white',
        font: 'impact',
        pos: { x: 150, y: 45 },
    },
    {
        txt: 'Bottom goes here',
        size: 25,
        align: 'center',
        color: 'white',
        font: 'impact',
        pos: { x: 150, y: 140 },
    }
    ]
}

let gIsDrag

function setFont(lineIdx,font){
    gMeme.lines[lineIdx].font = font
}

function loadImages() {
    gImgs = _loadImgsFromStorage() || createImages()
    _saveImgsToStorage()
}

function getMyMemes() {
    return loadFromStorage(MEMES_KEY)
}

function createImages() {
    let imgs = []
    for (let i = 0; i < 18; i++) {
        imgs.push({ id: makeId(), url: `img/${i + 1}.jpg`, keywords: ['funny', 'cat'] })
    }
    return imgs
}



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

function changeLineHeight(lineIdx, action) {
    gMeme.lines[lineIdx].pos.y += action
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
        color: 'white',
        pos: { x: 150, y: 100 }
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

function _loadImgsFromStorage() {
    return loadFromStorage(IMGS_KEY)
}

function _saveImgsToStorage() {
    saveToStorage(IMGS_KEY, gImgs)
}