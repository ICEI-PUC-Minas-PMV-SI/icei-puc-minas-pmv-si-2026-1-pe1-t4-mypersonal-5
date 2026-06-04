/* ============================================================
   aluno-estatisticas-config.js
   Codigo das telas de estatisticas, historico, nova avaliacao
   e configuracoes do aluno usando localStorage.
   ============================================================ */
(function () {
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

  /* codigo para exibir numeros com unidade ou traco quando estiver vazio */
  function numeroOuTraco(valor, sufixo) {
    const numero = converterDecimal(valor);
    if (numero === null) return "-";
    return `${numero.toLocaleString("pt-BR")}${sufixo || ""}`;
  }

  /* codigo para aceitar numeros com ponto ou virgula */
  function converterDecimal(valor) {
    if (valor === "" || valor === null || valor === undefined) return null;
    const normalizado = String(valor).replace(",", ".");
    const numero = Number(normalizado);
    return Number.isNaN(numero) ? null : numero;
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

  /* codigo para calcular datas relativas usadas nos gruposFiltro do historico */
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

  /* codigo para atualizar os cartoes principais de metricas */
  function atualizarCardsMetricas(valores) {
    const cartoes = document.querySelectorAll(".estatisticas-grid .metric-card");
    valores.forEach((valor, indice) => {
      const alvo = cartoes[indice]?.querySelector(".metric-value");
      if (alvo) alvo.textContent = valor;
    });
  }

  /* codigo da tabela de historico de avaliacoes */
  function renderizarTabelaHistorico(corpoTabela, avaliacoes, incluirAcoes) {
    if (!avaliacoes.length) {
      const colunas = incluirAcoes ? 7 : 5;
      corpoTabela.innerHTML = `<tr><td colspan="${colunas}" data-label="Registros">Nenhum registro encontrado para os filtros selecionados.</td></tr>`;
      return;
    }

    corpoTabela.innerHTML = avaliacoes.slice().reverse().map((avaliacao) => `
      <tr>
        <td data-label="Data">${incluirAcoes ? formatarData(avaliacao.data) : formatarMesAno(avaliacao.data)}</td>
        ${incluirAcoes ? `<td data-label="Tipo">${escaparHtml(formatarTipoAvaliacao(avaliacao.tipo))}</td>` : ""}
        <td data-label="Peso">${numeroOuTraco(avaliacao.peso, " kg")}</td>
        <td data-label="% Gordura">${numeroOuTraco(avaliacao.gordura, "%")}</td>
        <td data-label="IMC">${calcularImc(avaliacao)}</td>
        ${incluirAcoes ? `<td data-label="Massa magra">${numeroOuTraco(avaliacao.massaMagra, " kg")}</td>` : `<td data-label="Observacao">${escaparHtml(avaliacao.observacoes || "-")}</td>`}
        ${incluirAcoes ? `
          <td data-label="Acoes">
            <div class="historico-actions">
              <button class="btn btn-secondary btn-sm" type="button" data-view-avaliacao="${escaparHtml(avaliacao.id)}">Ver mais</button>
              <button class="btn btn-secondary btn-sm btn-delete-avaliacao" type="button" data-delete-avaliacao="${escaparHtml(avaliacao.id)}">Excluir</button>
            </div>
          </td>
        ` : ""}
      </tr>
    `).join("");
  }

  /* codigo dos cartoes de resumo do historico filtrado */
  function renderizarMetricasHistorico(avaliacoes) {
    const metricas = document.querySelectorAll(".metrics-grid .metric-card .metric-value");
    if (!metricas.length) return;

    const ordenadas = avaliacoes.slice().sort((a, b) => a.data.localeCompare(b.data));
    const primeira = ordenadas[0];
    const ultima = ordenadas[ordenadas.length - 1];
    const pesoDiff = primeira && ultima ? calcularDiferenca(ultima.peso, primeira.peso) : 0;
    const gorduraDiff = primeira && ultima ? calcularDiferenca(ultima.gordura, primeira.gordura) : 0;

    metricas[0].textContent = String(avaliacoes.length);
    metricas[1].textContent = `${pesoDiff > 0 ? "+" : ""}${pesoDiff.toLocaleString("pt-BR")} kg`;
    metricas[2].textContent = `${gorduraDiff > 0 ? "+" : ""}${gorduraDiff.toLocaleString("pt-BR")}%`;
    metricas[1].classList.toggle("negativo", pesoDiff < 0);
    metricas[2].classList.toggle("negativo", gorduraDiff < 0);
    if (metricas[3]) metricas[3].textContent = String(avaliacoes.length * 4);
  }

  /* codigo para ler quais filtros estao ativos no historico */
  function buscarFiltrosHistorico() {
    const grupos = document.querySelectorAll(".secao-filtros .opcoes-filtro");
    const tipoTexto = normalizarTexto(grupos[0]?.querySelector(".filtro-btn.ativo")?.textContent.trim() || "todos");
    const periodoTexto = normalizarTexto(grupos[1]?.querySelector(".filtro-btn.ativo")?.textContent.trim() || "ultimos 3 meses");
    const dataInicio = document.getElementById("data-inicio")?.value || "";
    const dataFim = document.getElementById("data-fim")?.value || "";

    return { tipoTexto, periodoTexto, dataInicio, dataFim };
  }

  /* codigo que aplica filtro por tipo e periodo nas avaliacoes */
  function filtrarAvaliacoes(avaliacoes) {
    const gruposFiltro = buscarFiltrosHistorico();

    return avaliacoes.filter((avaliacao) => {
      const tipo = normalizarTexto(avaliacao.tipo || "");
      const tipoOk = gruposFiltro.tipoTexto.includes("todos")
        || (gruposFiltro.tipoTexto.includes("reavaliacao")
          ? tipo.includes("reavaliacao")
          : (tipo.includes("avaliacao") || tipo.includes("corporal")) && !tipo.includes("reavaliacao"));

      let dataOk = true;
      if (gruposFiltro.periodoTexto.includes("ultimo mes") && !gruposFiltro.periodoTexto.includes("3") && !gruposFiltro.periodoTexto.includes("6")) {
        dataOk = avaliacao.data >= buscarDataMesesAtras(1);
      } else if (gruposFiltro.periodoTexto.includes("3")) {
        dataOk = avaliacao.data >= buscarDataMesesAtras(3);
      } else if (gruposFiltro.periodoTexto.includes("6")) {
        dataOk = avaliacao.data >= buscarDataMesesAtras(6);
      } else if (gruposFiltro.periodoTexto.includes("personalizado")) {
        if (!gruposFiltro.dataInicio && !gruposFiltro.dataFim) return false;
        if (gruposFiltro.dataInicio) dataOk = dataOk && avaliacao.data >= gruposFiltro.dataInicio;
        if (gruposFiltro.dataFim) dataOk = dataOk && avaliacao.data <= gruposFiltro.dataFim;
      }

      return tipoOk && dataOk;
    });
  }

  /* codigo que atualiza tabela e resumo depois de filtrar o historico */
  function aplicarFiltrosHistorico() {
    const filtradas = filtrarAvaliacoes(buscarAvaliacoes());
    const corpoTabela = document.querySelector(".tabela-historico tbody");
    if (corpoTabela) renderizarTabelaHistorico(corpoTabela, filtradas, true);
    renderizarMetricasHistorico(filtradas);
    renderizarGraficosEvolucao(document, filtradas);
  }

  /* codigo para criar o modal de detalhes da avaliacao */
  function garantirModalDetalhe() {
    let modalDetalhe = document.getElementById("avaliacao-detail-modal");
    if (modalDetalhe) return modalDetalhe;

    modalDetalhe = document.createElement("div");
    modalDetalhe.className = "success-modal";
    modalDetalhe.id = "avaliacao-detail-modal";
    modalDetalhe.setAttribute("aria-hidden", "true");
    modalDetalhe.innerHTML = `
      <div class="avaliacao-detail-card" role="dialog" aria-modal="true" aria-labelledby="avaliacao-detail-title">
        <div class="avaliacao-detail-header">
          <div class="avaliacao-detail-icon">i</div>
          <div>
            <h2 id="avaliacao-detail-title">Detalhes da avaliacao</h2>
            <p>Resumo completo das medidas registradas.</p>
          </div>
        </div>
        <div id="avaliacao-detail-content" class="avaliacao-detail-content"></div>
        <div class="success-modal-actions avaliacao-detail-actions">
          <button class="btn btn-primary" type="button" data-close-detail>Fechar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalDetalhe);

    modalDetalhe.addEventListener("click", (evento) => {
      if (evento.target === modalDetalhe || evento.target.hasAttribute("data-close-detail")) {
        fecharModalDetalhe();
      }
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && modalDetalhe.classList.contains("is-open")) {
        fecharModalDetalhe();
      }
    });

    return modalDetalhe;
  }

  /* codigo do botao "Ver mais" para abrir os detalhes da avaliacao */
  function abrirModalDetalhe(avaliacao) {
    const modalDetalhe = garantirModalDetalhe();
    const conteudo = document.getElementById("avaliacao-detail-content");
    if (!conteudo) return;

    const fotos = Array.isArray(avaliacao.fotos) ? avaliacao.fotos : [];
    const blocoFotos = fotos.length
      ? `
        <div class="avaliacao-detail-notes">
          <span>Fotos do progresso</span>
          <div class="avaliacao-fotos-grid">
            ${fotos.map((foto) => `
              <div class="avaliacao-foto-item">
                <img src="${foto.dados}" alt="Foto ${escaparHtml(foto.tipo || "progresso")}">
                <span>${escaparHtml(foto.tipo || "Foto")}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `
      : "";

    conteudo.innerHTML = `
      <div class="avaliacao-detail-grid">
        <div class="avaliacao-detail-item"><span>Data</span><strong>${formatarData(avaliacao.data)}</strong></div>
        <div class="avaliacao-detail-item"><span>Tipo</span><strong>${escaparHtml(formatarTipoAvaliacao(avaliacao.tipo))}</strong></div>
        <div class="avaliacao-detail-item"><span>Peso</span><strong>${numeroOuTraco(avaliacao.peso, " kg")}</strong></div>
        <div class="avaliacao-detail-item"><span>Altura</span><strong>${numeroOuTraco(avaliacao.altura, " cm")}</strong></div>
        <div class="avaliacao-detail-item"><span>% Gordura</span><strong>${numeroOuTraco(avaliacao.gordura, "%")}</strong></div>
        <div class="avaliacao-detail-item"><span>Massa magra</span><strong>${numeroOuTraco(avaliacao.massaMagra, " kg")}</strong></div>
        <div class="avaliacao-detail-item"><span>IMC</span><strong>${calcularImc(avaliacao)}</strong></div>
        <div class="avaliacao-detail-item"><span>Cintura</span><strong>${numeroOuTraco(avaliacao.cintura, " cm")}</strong></div>
        <div class="avaliacao-detail-item"><span>Quadril</span><strong>${numeroOuTraco(avaliacao.quadril, " cm")}</strong></div>
      </div>
      <div class="avaliacao-detail-notes">
        <span>Observacoes</span>
        <p>${escaparHtml(avaliacao.observacoes || "Sem observacoes registradas.")}</p>
      </div>
      ${blocoFotos}
    `;

    modalDetalhe.classList.add("is-open");
    modalDetalhe.setAttribute("aria-hidden", "false");
    modalDetalhe.querySelector("[data-close-detail]")?.focus();
  }

  /* codigo para fechar o modal de detalhes */
  function fecharModalDetalhe() {
    const modalDetalhe = document.getElementById("avaliacao-detail-modal");
    if (!modalDetalhe) return;
    modalDetalhe.classList.remove("is-open");
    modalDetalhe.setAttribute("aria-hidden", "true");
  }

  /* codigo que monta o texto usado no relatorio exportado */
  function montarTextoRelatorio(avaliacoes) {
    const linhas = [
      "Relatorio de historico - Eliabe Monteiro",
      `Gerado em: ${formatarData(new Date().toISOString().slice(0, 10))}`,
      "",
      `Avaliacoes encontradas: ${avaliacoes.length}`,
      "",
    ];

    avaliacoes.slice().reverse().forEach((avaliacao) => {
      linhas.push(`Data: ${formatarData(avaliacao.data)}`);
      linhas.push(`Tipo: ${formatarTipoAvaliacao(avaliacao.tipo)}`);
      linhas.push(`Peso: ${numeroOuTraco(avaliacao.peso, " kg")}`);
      linhas.push(`Gordura: ${numeroOuTraco(avaliacao.gordura, "%")}`);
      linhas.push(`Massa magra: ${numeroOuTraco(avaliacao.massaMagra, " kg")}`);
      linhas.push(`IMC: ${calcularImc(avaliacao)}`);
      linhas.push(`Observacoes: ${avaliacao.observacoes || "-"}`);
      linhas.push("");
    });

    return linhas.join("\n");
  }

  /* codigo do botao de exportar relatorio do historico */
  function prepararDownloadHistorico() {
    const linkDownload = document.querySelector(".export-modal-actions a[download]");
    if (!linkDownload) return;

    const filtradas = filtrarAvaliacoes(buscarAvaliacoes());
    const arquivoBlob = new Blob([montarTextoRelatorio(filtradas)], { type: "text/plain;charset=utf-8" });
    const hrefAnterior = linkDownload.getAttribute("href");

    if (hrefAnterior && hrefAnterior.startsWith("blob:")) {
      URL.revokeObjectURL(hrefAnterior);
    }

    linkDownload.href = URL.createObjectURL(arquivoBlob);
    linkDownload.download = "Historico_EliabeMonteiro.txt";

    const nomeArquivo = document.querySelector(".export-file strong");
    const tipoArquivo = document.querySelector(".export-file span");
    if (nomeArquivo) nomeArquivo.textContent = "Historico_EliabeMonteiro.txt";
    if (tipoArquivo) tipoArquivo.textContent = "TXT";
  }

  /* codigo para atualizar a data da ultima avaliacao na tela */
  function atualizarDataUltima(ultima) {
    const dataUltima = document.querySelector(".data-ultima-avaliacao");
    if (dataUltima && ultima) {
      dataUltima.textContent = `Ultima avaliacao: ${formatarData(ultima.data)}`;
    }
  }

  /* codigo do grafico de linha */
  function criarGraficoLinha(avaliacoes, metrica, rotulo, sufixo) {
    const pontos = avaliacoes
      .map((avaliacao) => ({
        rotulo: formatarMesAno(avaliacao.data),
        valor: converterDecimal(avaliacao[metrica]),
      }))
      .filter((item) => item.valor !== null);

    if (pontos.length < 2) {
      return `<div class="chart-empty">Cadastre pelo menos duas avaliacoes para visualizar a evolucao.</div>`;
    }

    const largura = 640;
    const altura = 260;
    const espacamento = { top: 24, right: 28, bottom: 44, left: 54 };
    const valores = pontos.map((ponto) => ponto.valor);
    const valorMinimo = Math.min(...valores);
    const valorMaximo = Math.max(...valores);
    const intervalo = valorMaximo - valorMinimo || 1;

    const coordenadas = pontos.map((ponto, indice) => {
      const x = espacamento.left + (indice * (largura - espacamento.left - espacamento.right)) / (pontos.length - 1);
      const y = altura - espacamento.bottom - ((ponto.valor - valorMinimo) / intervalo) * (altura - espacamento.top - espacamento.bottom);
      return { ...ponto, x, y };
    });

    const caminho = coordenadas.map((ponto, indice) => `${indice === 0 ? "M" : "L"} ${ponto.x} ${ponto.y}`).join(" ");
    const area = `${caminho} L ${coordenadas[coordenadas.length - 1].x} ${altura - espacamento.bottom} L ${coordenadas[0].x} ${altura - espacamento.bottom} Z`;
    const linhasGrade = [0, 0.25, 0.5, 0.75, 1].map((passo) => {
      const y = espacamento.top + passo * (altura - espacamento.top - espacamento.bottom);
      const valor = valorMaximo - passo * intervalo;
      return `
        <line x1="${espacamento.left}" y1="${y}" x2="${largura - espacamento.right}" y2="${y}" class="chart-grid-line"></line>
        <text x="${espacamento.left - 10}" y="${y + 4}" class="chart-axis-label" text-anchor="end">${formatarValorMetrica(valor)}</text>
      `;
    }).join("");

    return `
      <svg class="evolution-chart" viewBox="0 0 ${largura} ${altura}" role="img" aria-label="${rotulo}">
        <defs>
          <linearGradient id="chart-fill-${metrica}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--green-primary)" stop-opacity="0.22"></stop>
            <stop offset="100%" stop-color="var(--green-primary)" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        ${linhasGrade}
        <path d="${area}" fill="url(#chart-fill-${metrica})"></path>
        <path d="${caminho}" class="chart-line"></path>
        ${coordenadas.map((ponto) => `
          <g>
            <circle cx="${ponto.x}" cy="${ponto.y}" r="4.5" class="chart-ponto"></circle>
            <text x="${ponto.x}" y="${ponto.y - 10}" class="chart-value" text-anchor="middle">${formatarValorMetrica(ponto.valor)}${sufixo}</text>
            <text x="${ponto.x}" y="${altura - 16}" class="chart-axis-label" text-anchor="middle">${ponto.rotulo}</text>
          </g>
        `).join("")}
      </svg>
    `;
  }

  /* codigo que insere os graficos nos areasGraficos das telas */
  function renderizarGraficosEvolucao(escopo, avaliacoesFiltradas) {
    const avaliacoes = avaliacoesFiltradas || buscarAvaliacoes();
    const areasGraficos = escopo.querySelectorAll(".chart-placeholder");
    if (!areasGraficos.length) return;

    if (areasGraficos[0]) {
      areasGraficos[0].classList.add("has-chart");
      areasGraficos[0].innerHTML = criarGraficoLinha(avaliacoes, "peso", "Evolucao do peso", " kg");
    }

    if (areasGraficos[1]) {
      areasGraficos[1].classList.add("has-chart");
      areasGraficos[1].innerHTML = criarGraficoLinha(avaliacoes, "gordura", "Evolucao do percentual de gordura", "%");
    } else if (areasGraficos[0] && window.location.pathname.includes("historicoprofissional")) {
      areasGraficos[0].classList.add("has-chart");
      areasGraficos[0].innerHTML = criarGraficoHistoricoCombinado(avaliacoes);
    }
  }

  /* codigo que cria dois graficos juntos na tela de historico */
  function criarGraficoHistoricoCombinado(avaliacoes) {
    const graficoPeso = criarGraficoLinha(avaliacoes, "peso", "Evolucao do peso", " kg");
    const graficoGordura = criarGraficoLinha(avaliacoes, "gordura", "Evolucao do percentual de gordura", "%");
    return `<div class="history-chart-grid">${graficoPeso}${graficoGordura}</div>`;
  }

  /* codigo da tela de estatisticas do aluno */
  function renderizarEstatisticaAluno() {
    if (!document.body.dataset.profile || document.body.dataset.profile !== "aluno") return;
    if (!document.querySelector(".tabela-avaliacoes")) return;

    const ultima = buscarUltimaAvaliacao();
    if (!ultima) return;

    atualizarCardsMetricas([
      numeroOuTraco(ultima.peso, " kg"),
      numeroOuTraco(ultima.gordura, "%"),
      numeroOuTraco(ultima.massaMagra, " kg"),
      "14",
    ]);

    atualizarDataUltima(ultima);

    const corpoTabela = document.querySelector(".tabela-avaliacoes tbody");
    if (corpoTabela) renderizarTabelaHistorico(corpoTabela, buscarAvaliacoes(), false);
    renderizarGraficosEvolucao(document);
  }

  /* codigo da tela de estatisticas vista pelo profissional */
  function renderizarEstatisticaProfissional() {
    if (!document.body.dataset.activePage || document.body.dataset.activePage !== "alunos") return;
    if (!document.querySelector(".estatisticas-grid")) return;
    if (!window.location.pathname.includes("estatisticaprofissional")) return;

    const ultima = buscarUltimaAvaliacao();
    if (!ultima) return;

    atualizarCardsMetricas([
      numeroOuTraco(ultima.peso, " kg"),
      numeroOuTraco(ultima.gordura, "%"),
      numeroOuTraco(ultima.massaMagra, " kg"),
      calcularImc(ultima),
    ]);

    atualizarDataUltima(ultima);

    const corpoTabela = document.querySelector(".tabela-avaliacoes tbody");
    if (corpoTabela) renderizarTabelaHistorico(corpoTabela, buscarAvaliacoes(), false);
    renderizarGraficosEvolucao(document);
  }

  /* codigo da tela de historico do profissional */
  function renderizarHistoricoProfissional() {
    if (!window.location.pathname.includes("historicoprofissional")) return;

    const avaliacoes = buscarAvaliacoes();
    const corpoTabela = document.querySelector(".tabela-historico tbody");
    if (corpoTabela) renderizarTabelaHistorico(corpoTabela, avaliacoes, true);
    aplicarFiltrosHistorico();
    configurarInteracoesHistorico();
  }

  /* codigo dos botoes, gruposFiltro, datas, ver mais e exportar no historico */
  function configurarInteracoesHistorico() {
    const gruposFiltro = document.querySelectorAll(".secao-filtros .opcoes-filtro");
    const camposData = document.querySelectorAll("#data-inicio, #data-fim");
    const botaoExportar = document.getElementById("export-history");
    const corpoTabela = document.querySelector(".tabela-historico tbody");

    gruposFiltro.forEach((grupo) => {
      grupo.querySelectorAll(".filtro-btn").forEach((botao) => {
        botao.addEventListener("click", () => {
          grupo.querySelectorAll(".filtro-btn").forEach((item) => item.classList.remove("ativo"));
          botao.classList.add("ativo");
          if (normalizarTexto(botao.textContent).includes("personalizado")) {
            document.getElementById("data-inicio")?.focus();
          }
          aplicarFiltrosHistorico();
        });
      });
    });

    camposData.forEach((campo) => {
      campo.addEventListener("change", () => {
        const grupoPeriodo = gruposFiltro[1];
        const botaoPersonalizado = Array.from(grupoPeriodo?.querySelectorAll(".filtro-btn") || [])
          .find((botao) => normalizarTexto(botao.textContent).includes("personalizado"));

        if (grupoPeriodo && botaoPersonalizado) {
          grupoPeriodo.querySelectorAll(".filtro-btn").forEach((item) => item.classList.remove("ativo"));
          botaoPersonalizado.classList.add("ativo");
        }

        aplicarFiltrosHistorico();
      });
    });

    if (corpoTabela) {
      corpoTabela.addEventListener("click", (evento) => {
        const botaoExcluir = evento.target.closest("[data-delete-avaliacao]");
        if (botaoExcluir) {
          const confirmou = confirm("Deseja excluir esta avaliacao? Esta acao nao pode ser desfeita.");
          if (!confirmou) return;

          excluirAvaliacao(botaoExcluir.dataset.deleteAvaliacao);
          aplicarFiltrosHistorico();
          return;
        }

        const botao = evento.target.closest("[data-view-avaliacao]");
        if (!botao) return;

        const avaliacao = buscarAvaliacoes().find((item) => item.id === botao.dataset.viewAvaliacao);
        if (avaliacao) abrirModalDetalhe(avaliacao);
      });
    }

    if (botaoExportar) {
      botaoExportar.addEventListener("click", prepararDownloadHistorico, true);
    }
  }

  /* codigo para exibir ou limpar mensagem de erro em um campo */
  function definirErroCampo(campo, mensagem) {
    const grupoCampo = campo.closest(".input-group");
    let erro = grupoCampo?.querySelector(".error-message");
    campo.classList.toggle("is-invalid", Boolean(mensagem));
    grupoCampo?.classList.toggle("has-error", Boolean(mensagem));

    if (grupoCampo && !erro) {
      erro = document.createElement("span");
      erro.className = "error-message";
      grupoCampo.appendChild(erro);
    }

    if (erro) erro.textContent = mensagem || "";
  }

  /* codigo para validar texto obrigatorio */
  function validarTextoObrigatorio(id, mensagem) {
    const campo = document.getElementById(id);
    if (!campo) return true;

    const invalido = campo.value.trim() === "";
    definirErroCampo(campo, invalido ? mensagem : "");
    return !invalido;
  }

  /* codigo para validar e-mail */
  function validarCampoEmail(id, mensagem) {
    const campo = document.getElementById(id);
    if (!campo) return true;

    const valor = campo.value.trim();
    const invalido = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    definirErroCampo(campo, invalido ? mensagem : "");
    return !invalido;
  }

  /* codigo para validar numeros positivos e faixas permitidas */
  function validarNumeroPositivo(id, mensagem, opcoes = {}) {
    const campo = document.getElementById(id);
    if (!campo) return true;

    if (opcoes.optional && campo.value.trim() === "") {
      definirErroCampo(campo, "");
      return true;
    }

    const numero = converterDecimal(campo.value);
    const invalido = numero === null
      || numero <= 0
      || (opcoes.max !== undefined && numero > opcoes.max)
      || (opcoes.min !== undefined && numero < opcoes.min);

    definirErroCampo(campo, invalido ? mensagem : "");
    return !invalido;
  }

  /* codigo de validacao da nova avaliacao */
  function validarNovaAvaliacao() {
    const validacoes = [
      validarTextoObrigatorio("data-avaliacao", "Informe a data da avaliacao."),
      validarNumeroPositivo("peso", "Informe um peso maior que zero."),
      validarNumeroPositivo("altura", "Informe uma altura maior que zero."),
      validarNumeroPositivo("gordura", "Informe um percentual entre 0 e 100.", { min: 0, max: 100 }),
      validarNumeroPositivo("massa-magra", "Informe uma massa magra maior que zero."),
      validarNumeroPositivo("cintura", "Informe uma cintura maior que zero.", { optional: true }),
      validarNumeroPositivo("quadril", "Informe um quadril maior que zero.", { optional: true }),
      validarNumeroPositivo("braco-direito", "Informe uma medida maior que zero.", { optional: true }),
      validarNumeroPositivo("braco-esquerdo", "Informe uma medida maior que zero.", { optional: true }),
      validarNumeroPositivo("coxa-direita", "Informe uma medida maior que zero.", { optional: true }),
      validarNumeroPositivo("coxa-esquerda", "Informe uma medida maior que zero.", { optional: true }),
    ];

    const valido = validacoes.every(Boolean);

    if (!valido) {
      const primeiroInvalido = document.querySelector("#form-avaliacao .is-invalid");
      primeiroInvalido?.focus();
    }

    return valido;
  }

  /* codigo para formatar diferencas no comparativo da avaliacao */
  function formatarDiferenca(valor, sufixo) {
    if (valor === null || valor === undefined || Number.isNaN(valor)) return "-";
    return `${valor > 0 ? "+" : ""}${valor.toLocaleString("pt-BR")}${sufixo}`;
  }

  /* codigo para ler uma foto escolhida pelo usuario */
  function lerFotoComoDataUrl(arquivo) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onload = () => resolve(leitor.result);
      leitor.onerror = () => reject(leitor.error);
      leitor.readAsDataURL(arquivo);
    });
  }

  /* codigo para diminuir a foto antes de salvar no localStorage */
  function compactarFoto(arquivo) {
    return new Promise((resolve) => {
      const imagem = new Image();
      const leitor = new FileReader();

      leitor.onload = () => {
        imagem.onload = () => {
          const limite = 900;
          const escala = Math.min(1, limite / Math.max(imagem.width, imagem.height));
          const largura = Math.round(imagem.width * escala);
          const altura = Math.round(imagem.height * escala);
          const canvas = document.createElement("canvas");
          const contexto = canvas.getContext("2d");

          if (!contexto) {
            resolve(leitor.result);
            return;
          }

          canvas.width = largura;
          canvas.height = altura;
          contexto.drawImage(imagem, 0, 0, largura, altura);
          resolve(canvas.toDataURL("image/jpeg", 0.76));
        };

        imagem.onerror = async () => resolve(await lerFotoComoDataUrl(arquivo));
        imagem.src = leitor.result;
      };

      leitor.onerror = async () => resolve(await lerFotoComoDataUrl(arquivo));
      leitor.readAsDataURL(arquivo);
    });
  }

  /* codigo para configurar previews e remocao das fotos da nova avaliacao */
  function configurarFotosNovaAvaliacao() {
    const entradaFotos = document.getElementById("fotos-avaliacao");
    const botaoAdicionar = document.getElementById("adicionar-fotos");
    const botoesFoto = Array.from(document.querySelectorAll("[data-foto-tipo]"));
    if (!entradaFotos || !botaoAdicionar || !botoesFoto.length) return () => [];

    const rotulos = {
      frente: "Frente",
      lado: "Lado",
      costas: "Costas",
    };
    const fotosSelecionadas = {
      frente: null,
      lado: null,
      costas: null,
    };
    let tipoAtual = "frente";

    function renderizarFoto(tipo) {
      const botaoFoto = botoesFoto.find((botao) => botao.dataset.fotoTipo === tipo);
      const foto = fotosSelecionadas[tipo];
      if (!botaoFoto) return;

      botaoFoto.classList.toggle("is-filled", Boolean(foto));
      botaoFoto.innerHTML = foto
        ? `<img src="${foto.dados}" alt="Foto ${rotulos[tipo]}"><span>${rotulos[tipo]}</span><button class="remover-foto" type="button" aria-label="Remover foto ${rotulos[tipo]}" data-remover-foto="${tipo}">x</button>`
        : `<span>${rotulos[tipo]}</span>`;
    }

    function buscarProximoTipoLivre() {
      return Object.keys(fotosSelecionadas).find((tipo) => !fotosSelecionadas[tipo]) || "frente";
    }

    botaoAdicionar.addEventListener("click", () => {
      tipoAtual = buscarProximoTipoLivre();
      entradaFotos.multiple = true;
      entradaFotos.click();
    });

    botoesFoto.forEach((botaoFoto) => {
      botaoFoto.addEventListener("click", (evento) => {
        const botaoRemover = evento.target.closest("[data-remover-foto]");
        if (botaoRemover) {
          evento.stopPropagation();
          fotosSelecionadas[botaoRemover.dataset.removerFoto] = null;
          renderizarFoto(botaoRemover.dataset.removerFoto);
          return;
        }

        tipoAtual = botaoFoto.dataset.fotoTipo;
        entradaFotos.multiple = false;
        entradaFotos.click();
      });

      botaoFoto.addEventListener("keydown", (evento) => {
        if (evento.key !== "Enter" && evento.key !== " ") return;
        evento.preventDefault();
        botaoFoto.click();
      });
    });

    entradaFotos.addEventListener("change", async () => {
      const arquivos = Array.from(entradaFotos.files || []).filter((arquivo) => arquivo.type.startsWith("image/"));
      if (!arquivos.length) return;

      const tipos = entradaFotos.multiple
        ? Object.keys(fotosSelecionadas).filter((tipo) => !fotosSelecionadas[tipo])
        : [tipoAtual];
      const tiposDestino = tipos.length ? tipos : Object.keys(fotosSelecionadas);

      for (const [indice, arquivo] of arquivos.slice(0, tiposDestino.length).entries()) {
        const tipo = tiposDestino[indice];
        fotosSelecionadas[tipo] = {
          tipo,
          nome: arquivo.name,
          dados: await compactarFoto(arquivo),
        };
        renderizarFoto(tipo);
      }

      entradaFotos.value = "";
    });

    return () => Object.values(fotosSelecionadas).filter(Boolean);
  }

  /* codigo do comparativo em tempo real da nova avaliacao */
  function configurarComparativoNovaAvaliacao() {
    const formulario = document.getElementById("form-avaliacao");
    const comparativo = document.querySelector(".comparativo-lista");
    if (!formulario || !comparativo) return;

    const ultima = buscarUltimaAvaliacao();
    if (!ultima) {
      comparativo.innerHTML = `
        <div class="item-comparativo">
          <span>Avaliacao anterior</span>
          <strong>Nenhum registro</strong>
        </div>
      `;
      return;
    }

    comparativo.innerHTML = `
      <div class="item-comparativo">
        <span>Data anterior</span>
        <strong>${formatarData(ultima.data)}</strong>
      </div>
      <div class="item-comparativo">
        <span>Peso</span>
        <strong data-comparativo="peso"></strong>
      </div>
      <div class="item-comparativo">
        <span>% Gordura</span>
        <strong data-comparativo="gordura"></strong>
      </div>
      <div class="item-comparativo">
        <span>Massa magra</span>
        <strong data-comparativo="massa-magra"></strong>
      </div>
      <div class="item-comparativo">
        <span>IMC anterior</span>
        <strong>${calcularImc(ultima)}</strong>
      </div>
    `;

    const campos = [
      { id: "peso", chave: "peso", anterior: ultima.peso, sufixo: " kg" },
      { id: "gordura", chave: "gordura", anterior: ultima.gordura, sufixo: "%" },
      { id: "massa-magra", chave: "massa-magra", anterior: ultima.massaMagra, sufixo: " kg" },
    ];

    function atualizarComparativo() {
      campos.forEach((item) => {
        const atual = converterDecimal(document.getElementById(item.id)?.value);
        const anterior = converterDecimal(item.anterior);
        const alvo = comparativo.querySelector(`[data-comparativo="${item.chave}"]`);
        if (!alvo) return;

        const valorAnterior = numeroOuTraco(item.anterior, item.sufixo);
        if (atual === null || anterior === null) {
          alvo.textContent = `Anterior: ${valorAnterior}`;
          return;
        }

        alvo.textContent = `Anterior: ${valorAnterior} (${formatarDiferenca(atual - anterior, item.sufixo)})`;
      });
    }

    campos.forEach((item) => {
      document.getElementById(item.id)?.addEventListener("input", atualizarComparativo);
    });

    atualizarComparativo();
  }

  /* codigo para salvar a nova avaliacao */
  function configurarNovaAvaliacao() {
    const formulario = document.getElementById("form-avaliacao");
    if (!formulario) return;

    configurarComparativoNovaAvaliacao();
    const buscarFotosSelecionadas = configurarFotosNovaAvaliacao();

    formulario.addEventListener("submit", (evento) => {
      if (!validarNovaAvaliacao()) {
        evento.preventDefault();
        evento.stopImmediatePropagation();
        return;
      }

      const data = document.getElementById("data-avaliacao")?.value || new Date().toISOString().slice(0, 10);

      const avaliacaoSalva = salvarAvaliacao({
        id: `avaliacao-${Date.now()}`,
        alunoId: "eliabe",
        data,
        tipo: document.getElementById("tipo-avaliacao")?.value || "Avaliação corporal",
        peso: document.getElementById("peso")?.value || "",
        altura: document.getElementById("altura")?.value || "",
        gordura: document.getElementById("gordura")?.value || "",
        massaMagra: document.getElementById("massa-magra")?.value || "",
        cintura: document.getElementById("cintura")?.value || "",
        quadril: document.getElementById("quadril")?.value || "",
        bracoDireito: document.getElementById("braco-direito")?.value || "",
        bracoEsquerdo: document.getElementById("braco-esquerdo")?.value || "",
        coxaDireita: document.getElementById("coxa-direita")?.value || "",
        coxaEsquerda: document.getElementById("coxa-esquerda")?.value || "",
        observacoes: document.getElementById("obs-avaliacao")?.value || "",
        fotos: buscarFotosSelecionadas(),
      });

      if (!avaliacaoSalva) {
        evento.preventDefault();
        evento.stopImmediatePropagation();
      }
    }, true);
  }

  /* codigo para carregar e salvar configuracoes do aluno */
  function configurarConfiguracoesAluno() {
    if (!window.location.pathname.includes("/aluno/configuracoes")) return;

    const configuracao = buscarConfigAluno();
    const mapaCampos = {
      nome: configuracao.nome,
      sobrenome: configuracao.sobrenome,
      email: configuracao.email,
      telefone: configuracao.telefone,
      cidade: configuracao.cidade,
    };

    Object.entries(mapaCampos).forEach(([id, valor]) => {
      const campo = document.getElementById(id);
      if (campo) campo.value = valor || "";
    });

    const preferencias = document.querySelectorAll(".preferencia-item input[type='checkbox']");
    if (preferencias[0]) preferencias[0].checked = Boolean(configuracao.preferencias?.email);
    if (preferencias[1]) preferencias[1].checked = Boolean(configuracao.preferencias?.agenda);
    if (preferencias[2]) preferencias[2].checked = Boolean(configuracao.preferencias?.mensagens);

    const botoesConfiguracoes = Array.from(document.querySelectorAll("[data-open-settings-modal]"));
    const botaoSalvar = botoesConfiguracoes.find((botao) => {
      return (botao.dataset.modalTitle || "").toLowerCase().includes("configura");
    });
    if (botaoSalvar) {
      botaoSalvar.addEventListener("click", (evento) => {
        if (!validarConfiguracoesAluno()) {
          evento.stopImmediatePropagation();
          return;
        }

        salvarConfigAluno({
          id: "eliabe",
          nome: document.getElementById("nome")?.value || "",
          sobrenome: document.getElementById("sobrenome")?.value || "",
          email: document.getElementById("email")?.value || "",
          telefone: document.getElementById("telefone")?.value || "",
          cidade: document.getElementById("cidade")?.value || "",
          preferencias: {
            email: Boolean(preferencias[0]?.checked),
            agenda: Boolean(preferencias[1]?.checked),
            mensagens: Boolean(preferencias[2]?.checked),
          },
        });
      }, true);
    }
  }

  /* codigo de validacao das configuracoes do aluno */
  function validarConfiguracoesAluno() {
    const validacoes = [
      validarTextoObrigatorio("nome", "Informe o nome."),
      validarTextoObrigatorio("sobrenome", "Informe o sobrenome."),
      validarCampoEmail("email", "Informe um e-mail valido."),
      validarTextoObrigatorio("telefone", "Informe o telefone."),
      validarTextoObrigatorio("cidade", "Informe a cidade."),
    ];

    const valido = validacoes.every(Boolean);
    if (!valido) {
      document.querySelector(".configuracoes-page .is-invalid")?.focus();
    }

    return valido;
  }

  /* codigo que inicia todas as funcoes quando a pagina termina de carregar */
  document.addEventListener("DOMContentLoaded", () => {
    garantirDadosIniciais();
    configurarNovaAvaliacao();
    configurarConfiguracoesAluno();
    renderizarEstatisticaAluno();
    renderizarEstatisticaProfissional();
    renderizarHistoricoProfissional();
  });
})();






