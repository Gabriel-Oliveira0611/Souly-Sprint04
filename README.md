# EcoPulse | Sprint 4 — Front-End Design Engineering

Aplicação do SoulUp Challenge da FIAP para gerenciar missões sustentáveis e recompensas, desenvolvida com React, Vite, TypeScript e Tailwind CSS. Evolui o projeto da Sprint 3 e consome a API Java do grupo por HTTP.

![EcoPulse](public/images/headerIcon.png)
![Souly, mascote do projeto](public/images/souly-perfil.jpg)

## Como Usar

| Acesso exigido pela FIAP | Link / situação |
| --- | --- |
| GitHub do front-end | https://github.com/Gabriel-Oliveira0611/Sprint03-EcoPulse-Front-End-Design-Engineering |
| API Java publicada | https://ecopulse-soulup-api.onrender.com/api/v1 |
| Swagger | https://ecopulse-soulup-api.onrender.com/swagger-ui/index.html |
| Código da API | https://github.com/pedrohcnascimento/ChallengeEcopulseMaven |
| Front-end na Vercel | **PENDENTE — publicar esta versão e inserir a URL pública aqui.** |
| Vídeo no YouTube, até 3 minutos | **PENDENTE — gravar esta versão integrada e inserir o link aqui.** |

O link do GitHub aponta para o repositório existente. As alterações desta versão precisam ser incorporadas à branch da equipe e enviadas ao GitHub. Não considere o site pronto para entrega enquanto houver pendências nesta tabela.

### Instalar e executar

Use Node.js 24.15 ou superior da linha 24. Também são compatíveis as linhas 22 a partir de 22.22.2 e 26 ou superior, conforme as dependências de testes. A instalação deve ocorrer na pasta que contém package.json.

~~~bash
npm ci
npm run dev
~~~

O endereço local aparece no terminal, normalmente http://localhost:5173. Não abra index.html por duplo clique ou Live Server.

A URL pública da API já é o padrão. Para alterá-la, copie .env.example para .env e ajuste:

~~~dotenv
VITE_API_BASE_URL=https://ecopulse-soulup-api.onrender.com/api/v1
~~~

Inclua /api/v1 no final, sem /swagger-ui. Reinicie o Vite depois de alterar o .env. As variáveis VITE_ ficam visíveis no navegador: configure apenas a URL pública, nunca senhas do Oracle ou segredos.

### Experimentar a integração

1. Acesse Recompensas e cadastre um benefício com nome, tipo e valor inteiro.
2. Acesse Missões → Nova missão.
3. Informe título, tipo, início e selecione ao menos uma recompensa. O término é opcional.
4. Após salvar, a aplicação abre os detalhes da missão retornada pela API.
5. Recarregue a página para consultar novamente o servidor.
6. Use Editar missão, Ativar/Desativar missão ou Excluir missão para exercitar PUT, PATCH e DELETE. A exclusão exige confirmação na interface.

As páginas realizam operações reais no backend. O catálogo não representa resgate financeiro em parceiros. A interface desta entrega cobre a gestão de missões e recompensas; chat com IA, autenticação e participação individual não foram adicionados.

### Publicar na Vercel

1. Envie a versão para o repositório da equipe.
2. Na Vercel, importe esse repositório e selecione a branch que contém a versão validada.
3. Use Framework Preset Vite, Install Command npm ci, Build Command npm run build e Output Directory dist.
4. Configure VITE_API_BASE_URL com o valor acima nos ambientes de publicação necessários.
5. Publique e confira /missoes, /recompensas e a abertura direta de uma rota de detalhes.
6. Insira a URL pública definitiva na tabela Como Usar.

O arquivo vercel.json inclui o fallback de SPA para que atualizar uma rota dinâmica não gere 404. Se a API restringir origens CORS, libere o domínio publicado na configuração do backend.

## Funcionalidades

- GET de listagens e detalhes de missões e recompensas.
- POST e PUT de missões e recompensas, PATCH de status de missão e DELETE com confirmação.
- Pesquisa textual e filtro por status na listagem de missões.
- Regras de datas e associação obrigatória de recompensa na criação da missão.
- Estados de carregamento, erro com nova tentativa, resposta vazia e registro não encontrado.
- Cancelamento de leituras ao trocar de página e limite de espera de 60 segundos.
- Mensagens de sucesso compartilhadas por Context.
- Menu para celular, links acessíveis, foco de navegação e títulos de páginas.
- Cinco páginas institucionais obrigatórias e páginas extras navegáveis da solução.

## Tecnologias utilizadas

| Tecnologia | Aplicação |
| --- | --- |
| React | Componentes e hooks useState, useEffect, useCallback, useRef e useContext |
| Vite | Desenvolvimento e build de produção |
| TypeScript | Interfaces, tipos union, intersection, genéricos e verificação estrita |
| React Router DOM | SPA, rotas estáticas e dinâmicas, parâmetros, redirecionamento e filtros na URL |
| Tailwind CSS | Toda a estilização visual da aplicação e seus breakpoints responsivos |
| Fetch API nativa | Comunicação HTTP com a API Java, sem Axios |
| Vitest + Testing Library + jsdom | Testes de serviços, validação e fluxos da interface |
| Oxlint | Verificação estática do código |
| GitHub Actions | Workflow de verificações para branches e pull requests |

Não há frameworks de UI adicionais. O CSS da aplicação contém apenas a importação do Tailwind. O design e os arquivos de mídia evoluem o projeto anterior do grupo.

## Rotas

| Rota | Função |
| --- | --- |
| / e /home | Página inicial; /home redireciona para / |
| /sobre | Sobre a proposta |
| /integrantes | Nome, foto, RM, turma e perfis da equipe |
| /faq | Perguntas frequentes |
| /contato | Canais profissionais da equipe |
| /sobre-souly e /souly-como-guia | Conceito e vídeos do assistente |
| /missoes | Listagem GET, busca e filtro |
| /missoes/nova | Cadastro POST |
| /missoes/:id | Detalhe GET, PATCH de status e DELETE |
| /missoes/:id/editar | Edição PUT |
| /recompensas | Catálogo GET |
| /recompensas/nova | Cadastro POST |
| /recompensas/:id | Detalhe GET e DELETE |
| /recompensas/:id/editar | Edição PUT |
| Demais caminhos | Página não encontrada |

IDs inválidos redirecionam para a listagem com mensagem personalizada. IDs válidos inexistentes exibem estado específico de não encontrado.

## Estrutura de Pastas

| Caminho | Responsabilidade |
| --- | --- |
| src/components | Layout, cards, formulários, diálogo e estados reutilizáveis |
| src/pages | Telas institucionais e telas de missões e recompensas |
| src/services | Cliente HTTP e serviços de missões e recompensas |
| src/types | Contratos TypeScript compatíveis com os DTOs da API |
| src/hooks | Carregamento assíncrono, cancelamento e nova tentativa |
| src/contexts | Context e provider das mensagens de feedback |
| src/utils | Datas, validação de formulários e IDs de rota |
| src/data | Conteúdo institucional e dados dos integrantes |
| src/test | Configuração e testes de integração da interface |
| public/images e public/videos | Mídias preservadas da entrega anterior |
| docs | Requisitos, validação e roteiro de entrega |
| .github/workflows | Verificações automáticas no GitHub |
| .env.example | Configuração de exemplo da URL pública da API |
| vercel.json | Configuração de build e fallback da SPA |

## Qualidade e execução

~~~bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
~~~

Para executar todas as verificações: npm run check. O build gera dist. O comando preview serve o último build local.

Os testes automatizados usam respostas controladas e não alteram o banco remoto. Consulte docs/TESTES.md para a distinção entre esses testes e a validação manual com a API publicada.

## Autores e Créditos

| Foto | Nome | RM | Turma | Perfis |
| --- | --- | --- | --- | --- |
| <img src="public/images/gabriel.jpg" width="64" alt="Gabriel"> | Gabriel Pereira de Oliveira | 572262 | 1TDSPW | [GitHub](https://github.com/Gabriel-Oliveira0611) · [LinkedIn](https://www.linkedin.com/in/gabriel-pereira-1aa4bb224/) |
| <img src="public/images/adalto.jpg" width="64" alt="Adalto"> | Adalto Massahiro Nagabe | 572298 | 1TDSPW | [GitHub](https://github.com/AdaltoNagabe) · [LinkedIn](https://www.linkedin.com/in/adalto-massashiro-nagabe-149685104/) |
| <img src="public/images/pedro.jpg" width="64" alt="Pedro"> | Pedro Henrique Carvalho | 570492 | 1TDSPW | [GitHub](https://github.com/pedrohcnascimento) · [LinkedIn](https://www.linkedin.com/in/pedrohenriquecn07/) |
| <img src="public/images/murillo.jpg" width="64" alt="Murillo"> | Murillo Siviero Lopes | 572724 | 1TDSPW | [GitHub](https://github.com/MurilloSLopes) · [LinkedIn](https://www.linkedin.com/in/murillo-llopes-23out99/) |
| <img src="public/images/kaua.jpg" width="64" alt="Kauã"> | Kauã Barros Ferreira | 571801 | 1TDSPW | [GitHub](https://github.com/KauaBF) · [LinkedIn](https://www.linkedin.com/in/kau%C3%A3-barros-ferreira-161a3a36b/) |

Dados e mídias preservados da entrega anterior. Origem do projeto: [EcoPulse original](https://github.com/Gabriel-Oliveira0611/Challenge01-Front-end-design-engineering), referência 97088656fd21eefc568244ad59b647cd528ad590.

## Contato

Os links profissionais dos integrantes estão acima e nas páginas Contato e Integrantes. Não há um endereço de suporte institucional verificado ou envio de mensagens dentro do site.

## Entrega

Consulte docs/REQUISITOS.md e docs/ENTREGA.md. A FIAP exige ZIP único de até 50 MB, sem node_modules, enviado ao Portal do Aluno, além dos links e do histórico colaborativo verificável.

## Referências técnicas

- https://react.dev/reference/react
- https://reactrouter.com/start/declarative/routing
- https://vite.dev/guide/env-and-mode
- https://tailwindcss.com/docs/installation/using-vite
- https://vercel.com/docs/frameworks/frontend/vite
