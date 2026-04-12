# Especificações do Projeto

## Visão geral da solução
A solução proposta consiste em uma plataforma web front-end chamada MyPersonal. Seu propósito é centralizar informações relevantes do acompanhamento entre profissionais da saúde e alunos em uma interface única, com foco em organização, praticidade e facilidade de consulta.

Na visão do profissional, a plataforma deve apoiar o gerenciamento de agenda, a montagem de treinos e dietas, o registro de avaliações e o acompanhamento do histórico do aluno. Na visão do aluno, a plataforma deve facilitar o acesso ao plano de treino, à dieta, às datas importantes, a
vídeos de apoio e às próprias estatísticas de evolução.

Como se trata de um projeto de aplicação web front-end, o foco desta etapa recai na especificação da experiência, das telas e do comportamento esperado da interface. Integrações complexas com pagamentos, dispositivos vestíveis, prontuários ou exames ficam fora do escopo inicial.


## Personas

- Pierre, 39 anos, é um personal trainer com alta demanda e rotina intensa. Ele atende diversos alunos diariamente e precisa lidar com agenda, treinos, evolução física e comunicação constante. Atualmente, utiliza diferentes ferramentas para organizar seu trabalho, o que gera retrabalho e perda de tempo.
Ele busca uma solução simples e centralizada que permita gerenciar todas as informações em um único ambiente, facilitando o acompanhamento dos alunos e aumentando sua produtividade.

- Rafaela, 29 anos, é nutricionista e atende diversos pacientes, precisando registrar dietas, avaliações e evolução de forma contínua. Apesar de organizada, enfrenta dificuldades com a fragmentação das informações, já que utiliza diferentes ferramentas no dia a dia.
Por isso, busca uma solução que centralize os dados em um único ambiente, com acesso rápido, organização clara e praticidade no uso.

- Eliabe, 45 anos, treina regularmente e é bastante engajado com sua evolução física. Ele valoriza métricas e gosta de acompanhar seu progresso por meio de dados e indicadores.
No entanto, se incomoda com a necessidade de usar diferentes aplicativos para acessar treinos, histórico e evolução. Por isso, busca uma solução que concentre essas informações em um único lugar, com visual claro e foco em desempenho.

- Lucas, 22 anos, está começando sua jornada de mudança de hábitos e ainda não possui familiaridade com treinos estruturados ou termos técnicos da área. Ele busca melhorar sua saúde, mas precisa de orientação clara e acessível para manter consistência.
Por isso, procura uma solução simples e intuitiva, que facilite o entendimento das atividades e torne sua rotina mais organizada.


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|ID |EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|---|--------------------|------------------------------------|----------------------------------------|
|US01|Personal Trainer|Gerenciar minha agenda de atendimentos e datas de troca de treino | Organizar meu trabalho e evitar esquecimentos|
|US02|Personal Trainer|Montar e atualizar treinos por aluno|Acompanhar a evolução de forma individualizada|
|US03|Nutricionista|Registrar dieta, observações e retornos do aluno|Centralizar o acompanhamento alimentar|
|US04|Profissional da saúde|Consultar histórico de avaliações e estatísticas do aluno|Tomar decisões com base na evolução registrada|
|US05|Profissional da saúde|Acessar um perfil consolidado de cada aluno|Ganhar produtividade e melhorar a qualidade do atendimento|
|US06|Aluno|Visualizar meu treino atual com instruções, repetições e vídeos de apoio|Executar as atividades com mais segurança|
|US07|Aluno|Acompanhar minha dieta e minhas metas|Manter constância na rotina proposta|
|US08|Aluno|Ver agenda, consultas e prazos de atualização do plano|Não perder compromissos importantes|
|US09|Aluno|Registrar observações sobre treino ou dificuldade sentida|Dar retorno ao profissional de forma simples|
|US10|Aluno|Consultar meu histórico e minhas estatísticas|Perceber minha evolução ao longo do tempo|


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Origem (histórias) | Prioridade | 
|------|-------------------------|--------------------|------------| 
|RF01|Permitir o cadastro e a visualização de agenda de atendimentos, consultas e datas de atualização de treino|US01, US07|ALTA|  
|RF02|Permitir ao profissional cadastrar, editar e organizar treinos por aluno|US02|ALTA|
|RF03|Permitir ao aluno visualizar o treino atual com exercícios, séries, repetições e observações|US05|ALTA|
|RF04|Permitir o registro e a visualização de dieta por aluno|US03, US06|ALTA|
|RF05|Permitir a consulta do histórico de treinos, dieta e avaliações|US04, US09|ALTA|
|RF06|Permitir ao profissional visualizar um perfil consolidado do aluno com dados principais do acompanhamento|US10|ALTA|
|RF07|Permitir o registro de avaliações corporais e estatísticas do aluno|US04, US09|MÉDIA|
|RF08|Permitir associar links de vídeo explicativo aos exercícios|US05|MÉDIA|
|RF09|Permitir ao aluno registrar observações ou dificuldades relacionadas ao treino|US08|MÉDIA|
|RF10|Permitir a exportação das estatísticas do aluno em formato de relatório visual|US09|BAIXA|


### Requisitos não Funcionais

|ID     | Descrição do Requisito  | Categoria | Prioridade |
|-------|-------------------------|-----------|------------|
|RNF01|A interface deve ser responsiva e utilizável em desktop e smartphone|Usabilidade/Compatibilidade|ALTA| 
|RNF02|A navegação deve utilizar linguagem simples, rótulos claros e organização visual consistente|Usabilidade|ALTA|
|RNF03|As telas principais devem manter contraste adequado e tamanho de fonte legível|Acessibilidade|ALTA|
|RNF04|Os dados exibidos devem respeitar perfis de acesso distintos entre profissional e aluno|Segurança|ALTA|
|RNF05|Informações pessoais devem ser apresentadas com cuidado de privacidade e consentimento de uso|Ética/Privacidade|ALTA|
|RNF06|A estrutura da interface deve permitir expansão futura para integrações com back-end e API|Suportabilidade|MÉDIA|
|RNF07|O protótipo front-end deve manter tempo de resposta compatível com navegação fluida em condições normais de uso|Desempenho|MÉDIA|
|RNF08|Os componentes da interface devem seguir padrão visual minimalista e de fácil aprendizado|Usabilidade|MÉDIA|


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O escopo inicial contempla uma aplicação web com foco front-end; serviços de back-end, autenticação real, banco de dados e integrações externas poderão ser simulados ou representados por dados fictícios, conforme a estratégia definida pela equipe.|
|02| Pagamentos online, prontuário eletrônico, upload nativo de exames e integração com dispositivos vestíveis ficam fora do escopo mínimo da primeira etapa.|
|03| O projeto deverá priorizar as funcionalidades centrais de agenda, treino, dieta, histórico e estatísticas, evitando dispersão do desenvolvimento em recursos secundários.|
|04|A interface deverá ser pensada para navegação simples e acessível, considerando usuários iniciantes e cenários de uso em dispositivos móveis.|
