const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaolongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconePlayPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somInicial = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somFinal = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


musica.loop = true; // musica.loop igual a true. O objetivo é que a música fique tocando em looping, ou seja, o tempo inteiro.
 
musicaFocoInput.addEventListener('change', () => {
    
    if(musica.paused) {
            musica.play()
        } else {
            musica.pause()
        }
})

botaoFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    botaoFoco.classList.add('active') // adicionando a classe active nos botões
})

botaoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    botaoCurto.classList.add('active') // adicionando a classe active nos botões
})  

botaolongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    botaolongo.classList.add('active') // adicionando a classe active nos botões
})

function alterarContexto(contexto) {
        botoes.forEach(function (contexto) {    
            contexto.classList.remove('active')
    })

    mostrarTempo();
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
        break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
        break;

        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        break;

        default:
        break;
    }
}

// Função para realizar a contagem regressiva
const contagemRegressiva = () => {
    // Verifica se o tempo decorrido atingiu zero ou menos
    if (tempoDecorridoEmSegundos <= 0) {
        somFinal.play();
        alert('Tempo finalizado!');

        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        
        zerar(); // Chama a função para parar a contagem regressiva
        return; // Retorna da função, encerrando a execução prematuramente
    }
    tempoDecorridoEmSegundos -= 1; // Decrementa o tempo decorrido em um segundo
    mostrarTempo();
}

// Função para iniciar ou pausar a contagem
function iniciarOuPausar() {
    // Verifica se há um intervalo em execução
    if (intervaloId) {
        somPause.play()
        zerar(); // Se sim, chama a função para parar a contagem regressiva
        return; // Retorna da função, encerrando a execução prematuramente
    }
    somInicial.play();
    // Se não houver intervalo em execução, inicia um novo intervalo
    intervaloId = setInterval(contagemRegressiva, 1000); // Chama a função a cada 1000 milissegundos (1 segundo)
    iniciarOuPausarBt.textContent = "pausar";
    iconePlayPause.setAttribute('src','./imagens/pause.png'); 

}

// Adiciona um ouvinte de evento ao botão com ID 'startPauseBt'
startPauseBt.addEventListener('click', iniciarOuPausar);

// Função para parar a contagem regressiva
function zerar() {
    clearInterval(intervaloId); // Para o intervalo em execução
    iniciarOuPausarBt.textContent = "começar";
    iconePlayPause.setAttribute('src','./imagens/play_arrow.png');
    intervaloId = null; // Define o ID do intervalo como nulo, indicando que não há intervalo em execução
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo(); // a função é execultada, por isso aparece na tela