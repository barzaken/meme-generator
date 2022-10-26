'use strict'

function init(){
    createImages()
    renderGallery()
}


function renderGallery(myMemes){
    let imgs = getImgs()
    let strHtml = imgs.map(({ id,url }) => {
        return `
        <div class="card" onclick="onClickMeme(${id})">
            <img id="img${id}" src=${url}>
        </div>
        `
    }).join('')
    let elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHtml
}

function onClickMeme(id){
    setMeme(id)
    hideGallery()
    renderMeme()
}

function hideGallery(){
    let elGallery = document.querySelector('.gallery-container')
    elGallery.classList.add('hide')
}

function showGallery(){
    hideEditor()
    hideMyMemes()
    let elGallery = document.querySelector('.gallery-container')
    elGallery.classList.remove('hide')
}

function hideMyMemes(){
    let elMyMemes =  document.querySelector('.my-memes')
    elMyMemes.classList.add('hide')
}

function showMyMemes(){
    hideEditor()
    hideGallery()
    let elMyMemes =  document.querySelector('.my-memes')
    elMyMemes.classList.remove('hide')
    loadMyMemes()
}