/* ============================================================
   configuracoes-aluno.js
   Carrega, valida e salva as configuracoes do aluno modelo.
   ============================================================ */
(function (app) {
  const {
    buscarConfigAluno,
    salvarConfigAluno,
    validarCampoEmail,
    validarTextoObrigatorio,
  } = app;

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

  Object.assign(app, {
    validarConfiguracoesAluno,
    configurarConfiguracoesAluno,
  });
})(window.MyPersonal = window.MyPersonal || {});
