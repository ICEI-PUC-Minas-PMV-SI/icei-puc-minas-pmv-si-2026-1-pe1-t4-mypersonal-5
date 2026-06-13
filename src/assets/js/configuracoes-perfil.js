/* ============================================================
   configuracoes-perfil.js
   Carrega, valida e salva configuracoes conforme o perfil da pagina.
   ============================================================ */
(function (app) {
  const {
    buscarConfigAluno,
    buscarConfigProfissional,
    salvarConfigAluno,
    salvarConfigProfissional,
    validarCampoEmail,
    validarTextoObrigatorio,
  } = app;

  const CONFIGURACOES_POR_PERFIL = {
    aluno: {
      idPadrao: "eliabe",
      buscar: buscarConfigAluno,
      salvar: salvarConfigAluno,
      rota: "/aluno/configuracoes",
    },
    profissional: {
      idPadrao: "pierre",
      buscar: buscarConfigProfissional,
      salvar: salvarConfigProfissional,
      rota: "/profissional/configuracoes",
    },
  };

  function detectarConfigPerfil() {
    const caminho = window.location.pathname;
    if (caminho.includes(CONFIGURACOES_POR_PERFIL.aluno.rota)) return CONFIGURACOES_POR_PERFIL.aluno;
    if (caminho.includes(CONFIGURACOES_POR_PERFIL.profissional.rota)) return CONFIGURACOES_POR_PERFIL.profissional;
    return null;
  }

  /* codigo de validacao das configuracoes do perfil */
  function validarConfiguracoesPerfil() {
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

  function preencherCampos(configuracao) {
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
  }

  function aplicarPreferencias(configuracao, preferencias) {
    if (preferencias[0]) preferencias[0].checked = Boolean(configuracao.preferencias?.email);
    if (preferencias[1]) preferencias[1].checked = Boolean(configuracao.preferencias?.agenda);
    if (preferencias[2]) preferencias[2].checked = Boolean(configuracao.preferencias?.mensagens);
  }

  function montarConfiguracao(idPadrao, preferencias) {
    return {
      id: idPadrao,
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
    };
  }

  /* codigo para carregar e salvar configuracoes conforme o perfil */
  function configurarConfiguracoesPerfil() {
    const configPerfil = detectarConfigPerfil();
    if (!configPerfil || !configPerfil.buscar || !configPerfil.salvar) return;

    const configuracao = configPerfil.buscar();
    const preferencias = document.querySelectorAll(".preferencia-item input[type='checkbox']");
    preencherCampos(configuracao);
    aplicarPreferencias(configuracao, preferencias);

    const botoesConfiguracoes = Array.from(document.querySelectorAll("[data-open-settings-modal]"));
    const botaoSalvar = botoesConfiguracoes.find((botao) => {
      return (botao.dataset.modalTitle || "").toLowerCase().includes("configura");
    });

    if (botaoSalvar) {
      botaoSalvar.addEventListener("click", (evento) => {
        if (!validarConfiguracoesPerfil()) {
          evento.stopImmediatePropagation();
          return;
        }

        configPerfil.salvar(montarConfiguracao(configPerfil.idPadrao, preferencias));
      }, true);
    }
  }

  Object.assign(app, {
    validarConfiguracoesPerfil,
    configurarConfiguracoesPerfil,
  });
})(window.MyPersonal = window.MyPersonal || {});
