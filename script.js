const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;
let points = 0;
/* Sit para localizar a chave das teclas: http://keycode.info/ */

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 200){
            //Descer
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }
        else{
            //Subir
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

let contagem;
const textPoints = document.querySelector('.points');
function marcarPontos(){
    textPoints.textContent = `Points: ${points}`;
    points += 1;
    contagem = setTimeout(marcarPontos, 500);
}

var timeoutCactus;
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1500;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            background.removeChild('cactus');
            clearInterval(leftInterval);
        }
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);
            clearTimeout(timeoutCactus);
            clearTimeout(contagem);
            document.body.innerHTML = '<h1>Fim de Jogo</h1>' + `<h1 class="points">Points: ${points}</h1>`;
        }
        else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    timeoutCactus = setTimeout(createCactus, randomTime);
}


createCactus();
marcarPontos();
document.addEventListener('keyup', handleKeyUp);