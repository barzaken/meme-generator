'use strict'

let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] }
]

let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Text goes here', 
        size: 40,
        align: 'center',
        color: 'red'
    }]
}

function setTxt(lineIdx,txt){
    gMeme.lines[lineIdx].txt = txt
}
function setTxtAlign(lineIdx,direction){
    gMeme.lines[lineIdx].align = direction
}

function setTxtSize(lineIdx,action){
    gMeme.lines[lineIdx].size += action
}

function setTxtColor(lineIdx,color){
    gMeme.lines[lineIdx].color = color
}

function deleteLine(lineIdx){
    gMeme.lines.splice(lineIdx,1)
}

function addLine(){
    gMeme.lines.push({
        txt: 'Text goes here', 
        size: 40,
        align: 'center',
        color: 'red'
    }
    )
}

function setMeme(id){
    gMeme.selectedImgId = id
}

function getMeme(){
    return gMeme
}


function getImgs(){
    return gImgs
}

function getImgUrlById(id){
    let {url} = gImgs.find(img => img.id === id)
    return url
}