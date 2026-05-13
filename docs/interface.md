
# Projeto de Interface

Esta seção detalha a arquitetura de interação do sistema MyPersonal, apresentando o fluxo de navegação segmentado pelos diferentes perfis de usuários (Aluno, Personal Trainer, Nutricionista e Personal Nutri). O design foi concebido para garantir alta usabilidade e eficiência, permitindo que cada perfil acesse suas ferramentas específicas de gestão e consulta, atendendo diretamente aos requisitos definidos na <a href="especification.md"> Documentação de Especificação</a>.

## User Flow

Os diagramas de fluxo abaixo descrevem a jornada de cada usuário no sistema, iniciando-se pela tela de autenticação e ramificando-se para as funcionalidades específicas de cada perfil (Personal Nutri, Nutricionista, Trainer e Aluno). Essa estrutura garante que cada ator do sistema acesse apenas as ferramentas pertinentes à sua função.

### Fluxos de Interação por Perfil

### 1. Perfil: Personal Nutricionista
Este fluxo contempla o usuário com acesso total às ferramentas de treino e dieta, permitindo uma gestão integrada do aluno.

![User Flow - Personal Nutricionista](img/userflow/userflow-personal-nutri-1.png)
![User Flow - Personal Nutricionista](img/userflow/userflow-personal-nutri-2.png)
![User Flow - Personal Nutricionista](img/userflow/userflow-personal-nutri-3.png)
![User Flow - Personal Nutricionista](img/userflow/userflow-personal-nutri-4.png)

* _[Acesse o diagrama interativo deste fluxo no Figma](https://www.figma.com/design/PFjpEWszxjKIBndIfxI1Cl/MY_PERSONAL?node-id=308-1176)_

### 2. Perfil: Nutricionista
Fluxo focado na gestão nutricional, incluindo anamnese, planos alimentares e acompanhamento de metas de dieta.

![User Flow - Nutricionista](img/userflow/userflow-nutri-1.png)
![User Flow - Nutricionista](img/userflow/userflow-nutri-2.png)
![User Flow - Nutricionista](img/userflow/userflow-nutri-3.png)
![User Flow - Nutricionista](img/userflow/userflow-nutri-4.png)

* _[Acesse o diagrama interativo deste fluxo no Figma](https://www.figma.com/design/PFjpEWszxjKIBndIfxI1Cl/MY_PERSONAL?node-id=308-1175)_

### 3. Perfil: Personal Trainer
Fluxo dedicado à prescrição de exercícios, montagem de treinos e acompanhamento da evolução física do aluno.

![User Flow - Personal Trainer](img//userflow/userflow-personal-1.png)
![User Flow - Personal Trainer](img//userflow/userflow-personal-2.png)
![User Flow - Personal Trainer](img//userflow/userflow-personal-3.png)
![User Flow - Personal Trainer](img//userflow/userflow-personal-4.png)

* _[Acesse o diagrama interativo deste fluxo no Figma](https://www.figma.com/design/PFjpEWszxjKIBndIfxI1Cl/MY_PERSONAL?node-id=305-2)_

### 4. Perfil: Aluno
Fluxo simplificado focado na consulta de treinos, dietas e visualização do progresso pessoal.

![User Flow - Aluno](img/userflow/userflow-aluno-1.png)
![User Flow - Aluno](img/userflow/userflow-aluno-2.png)
![User Flow - Aluno](img/userflow/userflow-aluno-3.png)

* _[Acesse o diagrama interativo deste fluxo no Figma](https://www.figma.com/design/pBY8aNzOlQrlIHmqY0jGSM/MY_PERSONAL--Nathan-?node-id=2001-2&p=f&t=lvWNzWgRzmxTiBBK-0)_


## Wireframes

Os wireframes apresentam o layout funcional das principais telas do sistema, detalhando a disposição dos elementos de interface e os componentes de navegação. Foram projetados com foco em uma experiência limpa, priorizando o acesso rápido às funções de prescrição e consulta.

### 1. Fluxo de Acesso: Login e Seleção de Perfil

Antes do acesso às funcionalidades específicas, o sistema apresenta uma interface unificada de autenticação e direcionamento. A **Tela de Login** possui um layout centralizado e minimalista, focando na clareza dos campos de entrada. Após a autenticação, o usuário é direcionado para a **Tela de Seleção de Perfil**, que utiliza **cards visuais amplos** para diferenciar as funções (Personal, Nutricionista ou Aluno). Este design garante que usuários com múltiplos papéis escolham o ambiente correto no início da sessão.

Nesta etapa, são atendidos os seguintes critérios:
* **RNF04:** Os dados exibidos devem respeitar perfis de acesso distintos entre profissional e aluno.
* **RNF02:** A navegação deve utilizar linguagem simples, rótulos claros e organização visual consistente.
* **RNF08:** Os componentes da interface devem seguir padrão visual minimalista e de fácil aprendizado.

![Wireframe - Login e Seleção](img/wireframe/wireframe-login.png)
![Wireframe - Login e Seleção](img/wireframe/wireframe-perfil.png)

---

### 2. Perfil: Personal Nutricionista

A interface do Personal Nutricionista utiliza um layout de painel administrativo (dashboard). A estrutura é composta por um **menu lateral (sidebar) em tom escuro** à esquerda, contendo os acessos para Dashboard, Meus Alunos, Agenda e Mensagens. No **topo superior direito**, há um identificador circular do perfil do usuário.

A **área central** é organizada em blocos de conteúdo:
1. **Resumo do dia:** Uma linha de cards horizontais que apresentam métricas rápidas (Alunos ativos, Treinos hoje, Próximo treino, Consultas, Mensagens).
2. **Consultas/Treinos do dia:** Uma seção central para visualização de dados em formato de tabela (aluno, tipo de atividade e status).
3. **Alunos Recentes:** Uma coluna lateral à direita com a listagem de perfis acessados recentemente e botões de ação rápida ("ver perfil").
4. **Agenda:** Uma seção inferior em largura total para listagem de próximos compromissos.

Nesta tela, são apresentados os seguintes requisitos:
* **RF01:** Permitir o cadastro e a visualização de agenda de atendimentos, consultas e datas de atualização de treino.
* **RF06:** Permitir ao profissional visualizar um perfil consolidado do aluno com dados principais do acompanhamento.
* **RF05:** Permitir a consulta do histórico de treinos, dieta e avaliações.

![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-dashboard.png)
![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-meus-alunos.png)
![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-meus-alunos-cadastro.png)
![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-perfil-aluno.png)
![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-editar-treino.png)
![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-editar-dieta.png)
![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-estatisticas.png)
![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-nova-avaliacao.png)
![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-agenda.png)
![Wireframe - Personal Nutricionista](img/wireframe/wireframe-personalnutri-mensagens.png)

* _[Acesse o protótipo visual deste perfil no Figma](https://www.figma.com/proto/PFjpEWszxjKIBndIfxI1Cl/MY_PERSONAL?node-id=130-2&t=eS2EBF13DQlfMLB6-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)_

---

### 3. Perfil: Nutricionista / Personal Trainer

Estes perfis utilizam a mesma interface base e identidade visual do Personal Nutricionista, mantendo o **sidebar escuro** e o sistema de **cards de resumo**. A diferença reside exclusivamente na disponibilidade das ferramentas: o sistema remove os pontos de acesso (links e botões) para funcionalidades fora da especialidade do profissional (por exemplo, o perfil de Nutricionista não visualiza as opções de montagem de treinos). O objetivo é manter a consistência visual, garantindo uma curva de aprendizado nula entre as diferentes especialidades.

Nesta tela, são apresentados os seguintes requisitos:
* **RF02 / RF04:** Cadastro e organização de treinos ou dietas por aluno (conforme a especialidade ativa).
* **RF07:** Registro de avaliações corporais e estatísticas do aluno.
* **RNF04:** Os dados exibidos devem respeitar perfis de acesso distintos entre profissional e aluno.

![Wireframe - Nutricionista](img/wireframe/wireframe-nutri-perfil-aluno-dieta.png)
![Wireframe - Nutricionista](img/wireframe/wireframe-nutri-perfil-aluno-estatistica.png)
![Wireframe - Personal Trainer](img/wireframe/wireframe-personal-perfil-aluno-treino.png)
![Wireframe - Personal Trainer](img/wireframe/wireframe-personal-perfil-aluno-estatistica.png)
* _[Acesse o protótipo visual deste perfil (Nutricionista) no Figma](https://www.figma.com/proto/PFjpEWszxjKIBndIfxI1Cl/MY_PERSONAL?node-id=130-1652&p=f&t=AA4Jr8QEJBeW7NyF-1&scaling=min-zoom&content-scaling=fixed&page-id=130%3A892)_
* _[Acesse o protótipo visual deste perfil (Personal) no Figma](https://www.figma.com/proto/PFjpEWszxjKIBndIfxI1Cl/MY_PERSONAL?node-id=228-2151&p=f&t=rgVDwapgMniIxkzi-1&scaling=min-zoom&content-scaling=fixed&page-id=130%3A66)_

---

### 4. Perfil: Aluno

A interface do Aluno mantém a linguagem visual da plataforma, utilizando o **menu lateral escuro** com opções de Início, Meu Treino, Minha Dieta, Histórico, Agenda e Mensagens. A **área central** é focada no acompanhamento diário do aluno, organizada da seguinte forma:

1. **Acesso rápido:** Uma linha de cards horizontais que direcionam o usuário para as seções de Treino, Dieta, Evolução, Agenda e Mensagens.
2. **Treino de hoje:** Um bloco central que lista os exercícios, séries e repetições prescritos, incluindo um botão para o aluno "Registrar observação" sobre a atividade.
3. **Próximos compromissos:** Uma coluna lateral à direita que exibe de forma clara as próximas datas de consultas, renovações de treino ou avaliações corporais.
4. **Minha evolução — resumo:** Uma seção inferior dedicada à visualização de métricas e gráficos de progresso físico.

Nesta tela, são apresentados os seguintes requisitos:
* **RF03:** Permitir ao aluno visualizar o treino atual com exercícios, séries, repetições e observações.
* **RF04:** Permitir o registro e a visualização de dieta por aluno.
* **RF09:** Permitir ao aluno registrar observações ou dificuldades relacionadas ao treino.
* **RF10:** Permitir a visualização das estatísticas do aluno em formato visual (Gráfico de evolução).

![Wireframe - Aluno](img/wireframe/wireframe-aluno-home.png)
![Wireframe - Aluno](img/wireframe/wireframe-aluno-treino.png)
![Wireframe - Aluno](img/wireframe/wireframe-aluno-dieta.png)
![Wireframe - Aluno](img/wireframe/wireframe-aluno-historico.png)
* _[Acesse o protótipo visual deste perfil no Figma](https://www.figma.com/proto/PFjpEWszxjKIBndIfxI1Cl/MY_PERSONAL?node-id=10-676&p=f&t=fqJoycUcvqU6mBV5-1&scaling=min-zoom&content-scaling=fixed&page-id=10%3A805)_