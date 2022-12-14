'use strict'

function init() {
    loadImages()
    renderGallery()
}

function renderGallery() {
    let imgs = getImgs()
    let strHtml = imgs.map(({ id }) => {
        return `
        <div class="card" onclick="onClickMeme('${id}')">
            <img id="img${id}" src=${getImgUrlById(id)}>
        </div>
        `
    }).join('')
    let elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHtml
}

function renderMyMemes() {
    let imgs = getMyMemes()
    console.log('img', imgs)
    let strHtml = imgs.map(({ selectedImgId: id }) => {

        return `
        <div class="card" onclick="onClickMeme('${id}')">
            <img src=${getImgUrlById(id)}>
        </div>
        `
    }).join('')
    let elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHtml
}

function toggleMenu() {
    document.querySelector('.main-layout').classList.toggle('menu-open')
}

function onClickMeme(id) {
    setMeme(id)
    hideGallery()
    renderMeme()
}

function hideGallery() {
    let elGallery = document.querySelector('.gallery-container')
    elGallery.classList.add('hide')
}

function showGallery() {
    gUploadSrc = ''
    hideEditor()
    loadImages()
    let elGallery = document.querySelector('.gallery-container')
    elGallery.classList.remove('hide')
    renderGallery()
}

function showMyMemes() {
    hideEditor()
    let elGallery = document.querySelector('.gallery-container')
    elGallery.classList.remove('hide')
    renderMyMemes()
}