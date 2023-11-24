// Declarando variáveis globais
let alunos = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo cliente
    let btnNovoAluno = document.getElementById("btnNovoAluno");
    let modalNovoAluno = document.getElementById("modalNovoAluno");
    let spanNovoAluno = modalNovoAluno.querySelector(".close");

    // Configurando eventos do modal novo cliente
    btnNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "block";
    };

    spanNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoAluno) {
            modalNovoAluno.style.display = "none";
        }
    };

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar cliente por placa
function identifica(matricula) {
    for (let aluno of alunos) {
        if (aluno.matricula === matricula.id) {
            return aluno;
        }
    }
    return null;
}

// Função para exibir modal de informações do cliente
function modal(button) {
    let aluno = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do cliente
    let matriculaModal = modal.querySelector("#matriculaModal");
    let nomeModal = modal.querySelector("#nomeModal");
    let serieModal = modal.querySelector("#serieModal");
    let turmaModal = modal.querySelector("#turmaModal");
    let itinerarioModal = modal.querySelector("#itinerarioModal");
    let mediaNotasModal = modal.querySelector("#mediaNotasModal");
    let btnExcluirAluno = modal.querySelector("#btnExcluirAluno");

    if (!matriculaModal || !nomeModal || !serieModal || !turmaModal || !itinerarioModal || !mediaNotasModal || !btnExcluirAluno) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    matriculaModal.innerHTML = aluno.matricula;
    nomeModal.innerHTML = aluno.nome;
    serieModal.innerHTML = aluno.serie;
    turmaModal.innerHTML = aluno.turma;
    itinerarioModal.innerHTML = aluno.itinerario;
    mediaNotasModal.innerHTML = aluno.mediaNotas;

    // Configurando o botão de excluir
    btnExcluirAluno.onclick = function () {
        excluirAluno(aluno.matricula);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

// Função para excluir cliente
function excluirAluno(matricula) {
    alunos = alunos.filter(aluno => aluno.matricula !== matricula);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("alunos");
    alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    tabela.innerHTML = "";

    for (let aluno of alunos) {
        let botaoid = `<td><button id='${aluno.matricula}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td class="aaa">${aluno.matricula}</td>
            <td class="aaa">${aluno.nome}</td>
            <td class="aaa">${aluno.serie}</td>
            <td class="aaa">${aluno.turma}</td>
            <td class="aaa">${aluno.itinerario}</td>
            <td class="aaa">${aluno.mediaNotas}</td>            
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo cliente
function cadastrarAluno() {
    let matricula = document.getElementById("matricula").value;
    let nome = document.getElementById("nome").value;
    let serie = document.getElementById("serie").value;
    let turma = document.getElementById("turma").value;
    let itinerario = document.getElementById("itinerario").value;
    let mediaNotas = document.getElementById("mediaNotas").value;

    // Verifica se a placa já está cadastrada
    if (alunoExistente(matricula)) {
        alert("Matrícula já cadastrada. Insira uma matrícula única.");
        return;
    }

    let novoAluno = {
        matricula: matricula,
        nome: nome,
        serie: serie,
        turma: turma,
        itinerario: itinerario,
        mediaNotas: mediaNotas
    };

    alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(novoAluno);

    // Salva no localStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // Recarrega a tabela após cadastrar um novo cliente
    carrega();

    // Esconde o modal de novo cliente
    modalNovoAluno.style.display = "none";
}

// Função para verificar se o cliente já existe
function alunoExistente(matricula) {
    return alunos.some(aluno => aluno.matricula === matricula);
}