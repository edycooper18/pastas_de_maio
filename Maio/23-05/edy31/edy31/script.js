const tabuleiroJogo = document.getElementById('gameBoard');
const exibicaoStatus = document.getElementById('status');
const botaoReiniciar = document.getElementById('resetButton');
const botaoIniciar = document.getElementById('startButton');
const alternadorTema = document.getElementById('themeToggle');

let estadoTabuleiro = ['','','','','','','','',''];
let jogadorAtual = 'X';
let jogoAtivo = false;
let jogoIniciado = false;

const mensagemVitoria = () => `Jogador ${jogadorAtual} Venceu!`;
const mensagemEmpate = () => `Jogo terminou me Empate!`;
const mensagemVezJOgadorAtual = () => `Vez do Jogador ${jogadorAtual}!`;

const condicoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function inicializarTabulerio() {
    if(!jogoIniciado) {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', lidarComCliqueNaCelula);
            tabuleiroJogo.appendChild(cell);
        }
        jogoIniciado = true;
    } else {
        document.querySelectorAll('cell').forEarch(cell => cell.textContent = '');
    }

     estadoTabuleiro = ['','','','','','','','',''];
     jogadorAtual = 'X';
     jogoAtivo = true;
     exibicaoStatus.textContent = mensagemVezJOgadorAtual();
     tabuleiroJogo.style.display = 'grid';
     botaoReiniciar.style.display = 'block';
     botaoIniciar.style.display = 'none'; 
}

function lidarComCliqueNaCelula(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (estadoTabuleiro[clickedCellIndex] !== '' || !jogoAtivo) {
        return
    }

    estadoTabuleiro[clickedCellIndex] = jogadorAtual;
    clickedCell.textContent = jogadorAtual;

    verificarResultado();
}

function verificarResultado() {
    let roundWon = false;
    for (let i = 0; i < condicoesVitoria.length; i++) {
        const winCondotion = condicoesVitoria[i];
        let a = estadoTabuleiro[winCondotion[0]];
        let b = estadoTabuleiro[winCondotion[1]];
        let c = estadoTabuleiro[winCondotion[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        exibicaoStatus.textContent = mensagemVitoria();
        jogoAtivo = false;
        return;
    }

    if (!estadoTabuleiro.includes('')) {
        exibicaoStatus.textContent = mensagemEmpate();
        jogoAtivo = false;
        return;
    }

    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    exibicaoStatus.textContent = mensagemVezJOgadorAtual();
}

function reiniciarJogo() {
    jogoAtivo = true;
    jogadorAtual = 'X';
    estadoTabuleiro = ['','','','','','','','',''];
    exibicaoStatus.textContent = mensagemVezJOgadorAtual();
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

function alternarTema() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

function aplicarTemaSalvo() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        alternadorTema.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        alternadorTema.checked = false;
    }
}

botaoReiniciar.addEventListener('click', reiniciarJogo);

botaoIniciar.addEventListener('click', inicializarTabulerio);

alternadorTema.addEventListener('change', alternarTema);

tabuleiroJogo.style.display = 'none';
botaoReiniciar.style.display = 'none';
exibicaoStatus.textContent = 'Clique em Iniciar para jogar!';

aplicarTemaSalvo();