const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    botoes.forEach(contexto => {
        contexto.classList.remove('active');

    });
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
             Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
    `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
    titulo.innerText;
}

function contagemRegressiva() {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()   // áudio executado quando cronômetro finalizar
        zerar();
        alert('Tempo finalizado!')
        zerar()
        return

    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (intervaloId) {
        audioPausa.play()   // áudio executado quando cronômetro for pausado
        zerar();
        return;
    }
    audioPlay.play()   // áudio executado quando cronômetro iniciar
    intervaloId = setInterval(contagemRegressiva, 1000); // Executa a função contagemRegressiva a cada 1 segundo
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}
