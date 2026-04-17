// --- FUNCIONALIDADES DA AGENDA ---

// 1. Seleciona os elementos da tela
const calendarGrid = document.getElementById('calendar-grid');
const monthYearDisplay = document.getElementById('month-year-display');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const newEventBtn = document.getElementById('new-event-btn');

// 2. Define a data inicial (Começando em Abril de 2026)
let currentDate = new Date(2026, 3, 1); 

// 3. Lista de compromissos fictícios
let events = [
    { date: '2026-04-10', title: 'Consulta 09h' },
    { date: '2026-04-15', title: 'Troca treino' },
    { date: '2026-04-22', title: 'Avaliação corporal' }
];

const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// 4. Função principal que desenha o calendário na tela
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Atualiza o texto do Mês e Ano
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

    // Adiciona os cabeçalhos dos dias da semana
    let html = `
        <div class="weekday">Dom</div>
        <div class="weekday">Seg</div>
        <div class="weekday">Ter</div>
        <div class="weekday">Qua</div>
        <div class="weekday">Qui</div>
        <div class="weekday">Sex</div>
        <div class="weekday">Sáb</div>
    `;

    // Calcula os dias do mês
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adiciona quadrados vazios antes do dia 1
    for (let i = 0; i < firstDayOfMonth; i++) {
        html += `<div class="day empty"></div>`;
    }

    // Adiciona os dias com seus respectivos eventos
    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.date === dateString);
        let eventsHtml = '';
        
        dayEvents.forEach(e => {
            eventsHtml += `<div class="event">${e.title}</div>`;
        });

        html += `
            <div class="day">
                <span class="date">${day}</span>
                ${eventsHtml}
            </div>
        `;
    }

    // Completa a última linha com quadrados vazios se necessário
    const totalCells = firstDayOfMonth + daysInMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    if (remainingCells < 7) {
        for (let i = 0; i < remainingCells; i++) {
            html += `<div class="day empty"></div>`;
        }
    }

    // Joga o HTML gerado para dentro da tela
    calendarGrid.innerHTML = html;
}

// 5. Configura os botões de voltar e avançar
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// 6. Configura o botão de adicionar compromisso
newEventBtn.addEventListener('click', () => {
    const title = prompt("Digite o nome do compromisso:");
    if (!title) return; // Se cancelar ou deixar vazio, para por aqui
    
    const dateInput = prompt("Digite a data (AAAA-MM-DD):", `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-01`);
    
    if (title && dateInput) {
        events.push({ date: dateInput, title: title });
        renderCalendar(); // Atualiza a tela para mostrar o novo evento
    }
});

// 7. Chama a função para desenhar a primeira vez ao abrir o site
renderCalendar();