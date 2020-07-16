function onOff(){
    document.querySelector('#modal').classList.toggle('hide')
    document.querySelector('#container').classList.toggle('hidecontainer')
}

document.querySelector('buttons.fat').addEventListener('click',onOff)