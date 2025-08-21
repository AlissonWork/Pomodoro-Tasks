const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.getElementById("start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const tempoNaTela = document.getElementById("timer");

const imagemBt = document.querySelector(".app__card-primary-butto-icon");

const musicaFocoInput = document.getElementById("alternar-musica");
const musica = new Audio('./sons/luna-rise-part-one.mp3');

const sonPause = new Audio('./sons/pause.mp3');
const sonPlay = new Audio('./sons/play.wav');
const sonBeep = new Audio('./sons/beep.mp3');
sonPause.volume = 0.5;
sonPlay.volume = 0.5;
sonBeep.volume = 0.3;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

// Controle da música
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    titulo.innerHTML = `
    Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
    `
    focoBt.classList.add("active");
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    titulo.innerHTML = `
    Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta.</strong>
    `
    curtoBt.classList.add("active");
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    titulo.innerHTML = `
    Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>
    `
    longoBt.classList.add("active");
})

// Alterna contexto do app (tema e imagem)
function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (botao) {
        botao.classList.remove("active")
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
}

// Contagem regressiva do timer
const contagemRegresiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        sonBeep.play();
        alert("Tempo Finalizado");
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

// Start/Pause
startPauseBt.addEventListener("click", iniciarOuPausar);
function iniciarOuPausar() {
    if (intervaloId) {
        imagemBt.src = "./imagens/play_arrow.png";
        iniciarOuPausarBt.textContent = "Começar";
        sonPause.play();
        zerar();
        return
    }
    sonPlay.play();
    intervaloId = setInterval(contagemRegresiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    imagemBt.src = "./imagens/pause.png";
}

// Reseta contagem
function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

// Renderiza tempo na tela (mm:ss)
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = ` ${tempoFormatado} `
}

mostrarTempo();
