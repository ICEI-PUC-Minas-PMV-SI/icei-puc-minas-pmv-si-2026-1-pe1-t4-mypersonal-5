// Selecionando os elementos na tela
const messagesDisplay = document.getElementById('messages-display');
const chatTitle = document.getElementById('chat-with');
const inputMessage = document.getElementById('input-message');
const btnSend = document.getElementById('btn-send');
const contactCards = document.querySelectorAll('.contact-card');
const searchInput = document.getElementById('search-contact'); // Selecionando a barra de busca

// Base de dados das conversas (Simulada)
let chatData = {
    pierre: {
        name: "Pierre (Personal Trainer)",
        messages: [
            { type: 'received', text: 'Olá! Atualizei seu treino para esta semana.' },
            { type: 'sent', text: 'Ótimo! Vi que adicionou agachamento. Vou testar hoje.' },
            { type: 'received', text: 'Perfeito. Qualquer dúvida sobre execução, me avisa.' },
            { type: 'sent', text: 'Certo! Obrigado.' }
        ]
    },
    rafaela: {
        name: "Rafaela (Nutrição)",
        messages: [
            { type: 'received', text: 'Como está a adaptação com a nova dieta?' },
            { type: 'sent', text: 'Está indo super bem, a saciedade está ótima!' }
        ]
    }
};

let activeContact = 'pierre';

// Função para mostrar as mensagens na tela
function renderMessages() {
    messagesDisplay.innerHTML = ''; // Limpa a tela
    const chat = chatData[activeContact];
    chatTitle.innerText = chat.name;

    chat.messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.type}`;
        msgDiv.innerHTML = `<span class="sender-name">${msg.type === 'sent' ? 'Você' : chat.name.split(' ')[0]}</span>
                            <div class="bubble">${msg.text}</div>`;
        messagesDisplay.appendChild(msgDiv);
    });
    
    // Rola para a última mensagem automaticamente
    messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
}

// Função para enviar mensagem
function sendMessage() {
    const text = inputMessage.value.trim();
    if (text !== '') {
        // Adiciona a mensagem no banco de dados
        chatData[activeContact].messages.push({ type: 'sent', text: text });
        inputMessage.value = ''; // Limpa o campo
        renderMessages(); // Atualiza a tela
        
        // Atualiza a pré-visualização no menu lateral
        document.getElementById(`last-msg-${activeContact}`).innerText = text;
    }
}

// Evento de clique para trocar de contato
contactCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove a marcação cinza de todos e coloca só no clicado
        contactCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Atualiza o contato ativo e renderiza
        activeContact = card.getAttribute('data-contact');
        renderMessages();
    });
});

// Eventos para o botão enviar e tecla Enter
btnSend.addEventListener('click', sendMessage);
inputMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// === NOVA FUNCIONALIDADE: BUSCA DE CONTATOS ===
searchInput.addEventListener('input', function() {
    const termoBusca = this.value.toLowerCase();

    contactCards.forEach(card => {
        // Pega o nome que está dentro do <h4> de cada cartão
        const nomeContato = card.querySelector('.contact-header h4').innerText.toLowerCase();

        // Se o nome do contato incluir o que foi digitado, ele mostra. Se não, ele esconde.
        if (nomeContato.includes(termoBusca)) {
            card.style.display = 'flex'; 
        } else {
            card.style.display = 'none'; 
        }
    });
});

// Inicia a primeira conversa ao carregar a página
renderMessages();