/* ============================================================
   sidebar-loader.js
   Injeta a sidebar conforme o perfil do usuário.
   Funciona detectando ?perfil= na URL ou data-profile no <body>.
   ============================================================ */

const PROFILE_MENUS = {
  "personal-trainer": {
    label: "Personal Trainer",
    initial: "P",
    items: [
      { label: "Dashboard",    href: "dashboard.html",      key: "dashboard" },
      { label: "Meus Alunos",  href: "alunos.html",          key: "alunos" },
      { label: "Agenda",       href: "agenda.html",          key: "agenda" },
      { label: "Mensagens",    href: "mensagens.html",       key: "mensagens" },
    ],
  },
  "nutricionista": {
    label: "Nutricionista",
    initial: "N",
    items: [
      { label: "Dashboard",    href: "dashboard.html",      key: "dashboard" },
      { label: "Meus Alunos",  href: "alunos.html",          key: "alunos" },
      { label: "Agenda",       href: "agenda.html",          key: "agenda" },
      { label: "Mensagens",    href: "mensagens.html",       key: "mensagens" },
    ],
  },
  "personal-nutricionista": {
    label: "Personal Nutricionista",
    initial: "PN",
    items: [
      { label: "Dashboard",    href: "dashboard.html",      key: "dashboard" },
      { label: "Meus Alunos",  href: "alunos.html",          key: "alunos" },
      { label: "Agenda",       href: "agenda.html",          key: "agenda" },
      { label: "Mensagens",    href: "mensagens.html",       key: "mensagens" },
    ],
  },
  "aluno": {
    label: "Aluno",
    initial: "A",
    items: [
      { label: "Início",       href: "home.html",            key: "home" },
      { label: "Meu Treino",   href: "meu-treino.html",      key: "meu-treino" },
      { label: "Minha Dieta",  href: "minha-dieta.html",     key: "minha-dieta" },
      { label: "Estatísticas", href: "estatisticas.html",    key: "estatisticas" },
      { label: "Agenda",       href: "agenda.html",          key: "agenda" },
      { label: "Mensagens",    href: "mensagens.html",       key: "mensagens" },
    ],
  },
};

/**
 * Detecta o perfil ativo. Ordem:
 *   1. data-profile no <body>
 *   2. ?perfil= na URL
 *   3. localStorage 'mypersonal:perfil'
 *   4. fallback: personal-trainer
 */
function detectProfile() {
  const body = document.body;
  if (body.dataset.profile) return body.dataset.profile;

  const url = new URLSearchParams(window.location.search);
  if (url.get("perfil")) {
    localStorage.setItem("mypersonal:perfil", url.get("perfil"));
    return url.get("perfil");
  }

  const stored = localStorage.getItem("mypersonal:perfil");
  if (stored) return stored;

  return "personal-trainer";
}

/**
 * Detecta a página ativa pelo nome do arquivo
 */
function detectActivePage() {
  if (document.body.dataset.activePage) return document.body.dataset.activePage;

  const path = window.location.pathname;
  const file = path.split("/").pop().replace(".html", "");
  return file || "dashboard";
}

/**
 * Renderiza a sidebar no elemento #sidebar-mount
 */
function renderSidebar() {
  const mount = document.getElementById("sidebar-mount");
  if (!mount) return;

  const profile = detectProfile();
  const active  = detectActivePage();
  const menu    = PROFILE_MENUS[profile] || PROFILE_MENUS["personal-trainer"];

  const itemsHTML = menu.items.map((item) => {
    const isActive = item.key === active;
    return `
      <a href="${item.href}" class="menu-item ${isActive ? "active" : ""}" data-page="${item.key}">
        <span>${item.label}</span>
      </a>
    `;
  }).join("");

  mount.innerHTML = `
    <div class="sidebar-overlay" data-sidebar-close></div>
    <aside class="sidebar" id="sidebar-menu">
      <div class="sidebar-header">
        <div class="brand">
          <div class="logo">MP</div>
          <span>MyPersonal</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        ${itemsHTML}
      </nav>

      <div class="user-profile-sidebar">
        <div class="side-avatar">${menu.initial}</div>
        <div class="side-info">
          <p class="side-name">Usuário</p>
          <p class="side-role">${menu.label}</p>
        </div>
      </div>
    </aside>
  `;
}

/**
 * Renderiza a topbar
 * Usa data-page-title no <body> ou um título padrão
 */
function renderTopbar() {
  const mount = document.getElementById("topbar-mount");
  if (!mount) return;

  const title = document.body.dataset.pageTitle || "MyPersonal";
  const back  = document.body.dataset.back;
  const initial = (PROFILE_MENUS[detectProfile()] || {}).initial || "U";

  mount.innerHTML = `
    <header class="topbar">
      <button type="button" class="menu-hamburguer" id="btn-menu-hamburguer" aria-label="Abrir menu" aria-controls="sidebar-menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div>
        ${back ? `<a href="${back.split("|")[0]}" class="back-link">← ${back.split("|")[1] || "Voltar"}</a>` : ""}
        <h1 class="topbar-title">${title}</h1>
      </div>
      <div class="topbar-actions">
        <div class="avatar avatar-sm">${initial}</div>
      </div>
    </header>
  `;
}

function setupMobileMenu() {
  const button = document.getElementById("btn-menu-hamburguer");
  const sidebarMount = document.getElementById("sidebar-mount");
  if (!button || !sidebarMount) return;

  const closeMenu = () => {
    document.body.classList.remove("menu-aberto");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
  };

  const openMenu = () => {
    document.body.classList.add("menu-aberto");
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Fechar menu");
  };

  button.addEventListener("click", () => {
    if (document.body.classList.contains("menu-aberto")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  sidebarMount.addEventListener("click", (event) => {
    if (event.target.closest("[data-sidebar-close]") || event.target.closest(".menu-item")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  renderTopbar();
  setupMobileMenu();
});
