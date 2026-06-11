/* ============================================================
   avaliacoes-dados.js
   Dados modelo, localStorage e funções utilitárias das avaliações.
   ============================================================ */
(function (app) {
  /* chaves usadas para salvar e buscar dados no localStorage */
  const CHAVES = {
    avaliacoes: "mypersonal:avaliacoes",
    configuracoesAluno: "mypersonal:configuracoesAluno",
  };

  /* dados iniciais do aluno usados quando o localStorage ainda esta vazio */
  const alunoPadrao = {
    id: "eliabe",
    nome: "Eliabe",
    sobrenome: "Monteiro",
    email: "eliabe@email.com",
    telefone: "(31) 98888-8888",
    cidade: "Belo Horizonte",
    preferencias: {
      email: true,
      agenda: true,
      mensagens: false,
    },
  };

  /* avaliacoes iniciais para alimentar estatisticas, historico e graficos */
  const avaliacoesIniciais = [
    {
      id: "avaliacao-2026-01-10",
      alunoId: "eliabe",
      data: "2026-01-10",
      tipo: "Avaliacao corporal",
      peso: 85,
      altura: 178,
      gordura: 21,
      massaMagra: 65,
      cintura: 91,
      quadril: 101,
      bracoDireito: 34,
      bracoEsquerdo: 34,
      coxaDireita: 57,
      coxaEsquerda: 57,
      observacoes: "Inicio do acompanhamento",
    },
    {
      id: "avaliacao-2026-02-10",
      alunoId: "eliabe",
      data: "2026-02-10",
      tipo: "Reavaliacao",
      peso: 83,
      altura: 178,
      gordura: 20,
      massaMagra: 66,
      cintura: 89,
      quadril: 100,
      bracoDireito: 35,
      bracoEsquerdo: 35,
      coxaDireita: 58,
      coxaEsquerda: 58,
      observacoes: "Boa aderencia",
    },
    {
      id: "avaliacao-2026-03-15",
      alunoId: "eliabe",
      data: "2026-03-15",
      tipo: "Avaliacao corporal",
      peso: 82,
      altura: 178,
      gordura: 18,
      massaMagra: 67,
      cintura: 87,
      quadril: 99,
      bracoDireito: 36,
      bracoEsquerdo: 36,
      coxaDireita: 59,
      coxaEsquerda: 59,
      observacoes: "Meta parcial atingida",
    },
  ];

  /* codigo para ler JSON do localStorage com valorPadrao se der erro */
  function lerJson(chave, valorPadrao) {
    try {
      const valor = localStorage.getItem(chave);
      return valor ? JSON.parse(valor) : valorPadrao;
    } catch (erro) {
      return valorPadrao;
    }
  }

  /* codigo para salvar JSON no localStorage */
  function salvarJson(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  /* codigo para criar dados iniciais no localStorage na primeira execucao */
  function garantirDadosIniciais() {
    if (!localStorage.getItem(CHAVES.avaliacoes)) {
      salvarJson(CHAVES.avaliacoes, avaliacoesIniciais);
    }

    if (!localStorage.getItem(CHAVES.configuracoesAluno)) {
      salvarJson(CHAVES.configuracoesAluno, alunoPadrao);
    }
  }

  /* codigo para buscar todas as avaliacoes em ordem de data */
  function buscarAvaliacoes() {
    garantirDadosIniciais();
    return lerJson(CHAVES.avaliacoes, []).sort((a, b) => a.data.localeCompare(b.data));
  }

  /* codigo para salvar uma nova avaliacao no localStorage */
  function salvarAvaliacao(avaliacao) {
    const avaliacoes = buscarAvaliacoes();
    avaliacoes.push(avaliacao);

    try {
      salvarJson(CHAVES.avaliacoes, avaliacoes);
      return true;
    } catch (erro) {
      alert("Nao foi possivel salvar a avaliacao. Tente usar fotos menores ou remover alguma foto.");
      return false;
    }
  }

  /* codigo para excluir uma avaliacao pelo id */
  function excluirAvaliacao(idAvaliacao) {
    const avaliacoesAtualizadas = buscarAvaliacoes().filter((avaliacao) => avaliacao.id !== idAvaliacao);
    salvarJson(CHAVES.avaliacoes, avaliacoesAtualizadas);
  }

  /* codigo para buscar as configuracoes salvas do aluno */
  function buscarConfigAluno() {
    garantirDadosIniciais();
    return lerJson(CHAVES.configuracoesAluno, alunoPadrao);
  }

  /* codigo para salvar as configuracoes do aluno */
  function salvarConfigAluno(configuracao) {
    salvarJson(CHAVES.configuracoesAluno, configuracao);
  }

  /* codigo para formatar data no padrao brasileiro */
  function formatarData(dataIso) {
    if (!dataIso) return "-";
    const partes = dataIso.split("-");
    if (partes.length !== 3) return dataIso;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  /* codigo para formatar mes e ano nos graficos e tabelas */
  function formatarMesAno(dataIso) {
    const data = new Date(`${dataIso}T00:00:00`);
    if (Number.isNaN(data.getTime())) return dataIso;

    return data.toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric",
    }).replace(".", "");
  }

  /* codigo para aceitar numeros com ponto ou virgula */
  function converterDecimal(valor) {
    if (valor === "" || valor === null || valor === undefined) return null;
    const normalizado = String(valor).replace(",", ".");
    const numero = Number(normalizado);
    return Number.isNaN(numero) ? null : numero;
  }

  /* codigo para exibir numeros com unidade ou traco quando estiver vazio */
  function numeroOuTraco(valor, sufixo) {
    const numero = converterDecimal(valor);
    if (numero === null) return "-";
    return `${numero.toLocaleString("pt-BR")}${sufixo || ""}`;
  }

  /* codigo para calcular IMC a partir de peso e altura */
  function calcularImc(avaliacao) {
    const peso = converterDecimal(avaliacao.peso);
    const alturaCm = converterDecimal(avaliacao.altura);
    if (!peso || !alturaCm) return "-";

    const alturaM = alturaCm / 100;
    return (peso / (alturaM * alturaM)).toFixed(1);
  }

  /* codigo para calcular diferenca entre duas medidas */
  function calcularDiferenca(atual, anterior) {
    const numeroAtual = converterDecimal(atual);
    const numeroAnterior = converterDecimal(anterior);
    if (numeroAtual === null || numeroAnterior === null) return 0;
    return numeroAtual - numeroAnterior;
  }

  /* codigo para formatar valores numericos usados nos graficos */
  function formatarValorMetrica(valor) {
    const numero = converterDecimal(valor);
    if (numero === null) return "-";
    return numero.toLocaleString("pt-BR");
  }

  /* codigo para calcular datas relativas usadas nos filtros do historico */
  function buscarDataMesesAtras(meses) {
    const data = new Date();
    data.setMonth(data.getMonth() - meses);
    return data.toISOString().slice(0, 10);
  }

  /* codigo para evitar HTML indevido em textos digitados pelo usuario */
  function escaparHtml(valor) {
    return String(valor || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* codigo para comparar textos ignorando acentos */
  function normalizarTexto(valor) {
    return String(valor || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  /* codigo para exibir o tipo da avaliacao com acentos */
  function formatarTipoAvaliacao(valor) {
    const tipoNormalizado = normalizarTexto(valor);
    if (tipoNormalizado.includes("reavaliacao")) return "Reavaliação";
    if (tipoNormalizado.includes("avaliacao") || tipoNormalizado.includes("corporal")) return "Avaliação corporal";
    return valor || "Avaliação corporal";
  }

  /* codigo para buscar a avaliacao mais recente */
  function buscarUltimaAvaliacao() {
    const avaliacoes = buscarAvaliacoes();
    return avaliacoes[avaliacoes.length - 1] || null;
  }

  Object.assign(app, {
    garantirDadosIniciais,
    buscarAvaliacoes,
    salvarAvaliacao,
    excluirAvaliacao,
    buscarConfigAluno,
    salvarConfigAluno,
    formatarData,
    formatarMesAno,
    converterDecimal,
    numeroOuTraco,
    calcularImc,
    calcularDiferenca,
    formatarValorMetrica,
    buscarDataMesesAtras,
    escaparHtml,
    normalizarTexto,
    formatarTipoAvaliacao,
    buscarUltimaAvaliacao,
  });
})(window.MyPersonal = window.MyPersonal || {});
