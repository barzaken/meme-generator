'use strict'

function init(){
    renderGallery()
}

function renderGallery(){
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