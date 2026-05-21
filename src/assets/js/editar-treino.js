let contadorLinhas = 0;

// Carrega as 5 linhas estruturais 
document.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i < 5; i++) {
        adicionarLinha();
    }
});

// Altera visualmente as abas superiores de grupo
function selecionarAba(botao) {
    const abas = document.querySelectorAll('.aba-treino');
    abas.forEach(aba => aba.classList.remove('ativa'));
    botao.classList.add('ativa');
}

// Adiciona um novo grupo customizado 
function criarNovoGrupo() {
    const nome = prompt("Digite o nome do novo grupo de treino:");
    if (nome) {
        const bntNovo = document.querySelector('.botao-novo-grupo');
        const novoBotao = document.createElement('button');
        novoBotao.type = 'button';
        novoBotao.className = 'aba-treino';
        novoBotao.textContent = nome;
        novoBotao.onclick = function() { selecionarAba(this); };
        
        bntNovo.parentNode.insertBefore(novoBotao, bntNovo);
        selecionarAba(novoBotao);
    }
}


function adicionarLinha() {
    contadorLinhas++;
    const corpo = document.getElementById('corpoTabela');
    
    const novaLinha = document.createElement('div');
    novaLinha.className = 'linha-corpo';
    novaLinha.id = `linha_${contadorLinhas}`;
    
    novaLinha.innerHTML = `
        <div class="col-num numero-indice">${corpo.children.length + 1}</div>
        <div class="col-exercicio"><input type="text" class="input-exercicio" placeholder="Ex: Supino Reto"></div>
        <div class="col-dados"><input type="text" class="input-series" placeholder="4"></div>
        <div class="col-dados"><input type="text" class="input-reps" placeholder="12"></div>
        <div class="col-dados"><input type="text" class="input-desc" placeholder="60s"></div>
        <div class="col-obs"><input type="text" class="input-obs" placeholder="Foco na cadência"></div>
        <div class="col-video"><input type="text" class="input-video" placeholder="URL do vídeo"></div>
        <div class="col-remover">
            <button type="button" class="btn-remover" title="Remover exercício" onclick="removerLinha('${novaLinha.id}')">×</button>
        </div>
    `;
    
    corpo.appendChild(novaLinha);
}

function removerLinha(idLinha) {
    const linha = document.getElementById(idLinha);
    if (linha) {
        linha.remove();
        reindexarLinhas();
    }
}

 // Ajusta a contagem numérica da coluna 
function reindexarLinhas() {
    const indices = document.querySelectorAll('.numero-indice');
    indices.forEach((elemento, chave) => {
        elemento.textContent = chave + 1;
    });
}

function limparFormulario() {
    if (confirm("Tem certeza de que deseja limpar todos os dados preenchidos?")) {
        document.getElementById('formTreino').reset();
    }
}


function salvarDados(notificarAluno) {
    const nomeGrupo = document.getElementById('nomeGrupo').value;
    if (!nomeGrupo) {
        alert("Por favor, informe pelo menos o Nome do Grupo de Treino.");
        document.getElementById('nomeGrupo').focus();
        return;
    }

    const payload = {
        nome_grupo: nomeGrupo,
        musculatura_alvo: document.getElementById('musculaturaAlvo').value,
        observacoes_gerais: document.getElementById('obsGerais').value,
        notificar: true,
        exercicios: []
    };

    const linhas = document.querySelectorAll('#corpoTabela .linha-corpo');
    linhas.forEach(linha => {
        const ex = linha.querySelector('.input-exercicio').value;
        if (ex) { 
            payload.exercicios.push({
                nome: ex,
                series: linha.querySelector('.input-series').value,
                reps: linha.querySelector('.input-reps').value,
                descanso: linha.querySelector('.input-desc').value,
                observacao: linha.querySelector('.input-obs').value,
                video: linha.querySelector('.input-video').value
            });
        }
    });

    console.log("Payload mapeado com sucesso para envio:", payload);

    document.getElementById('modalConfirmacao').classList.add('visivel');
}