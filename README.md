# EcoPulse | SoulUp Challenge — Sprint 4

Aplicação do SoulUp Challenge da FIAP para gerenciar missões sustentáveis e recompensas, desenvolvida com React, Vite, TypeScript e Tailwind CSS. Evolui o projeto da Sprint 3 e consome a API Java do grupo por HTTP.

<p align="center">
  <img src="public/images/headerIcon.png" width="120" alt="Identidade visual do EcoPulse">
  <img src="public/images/souly-perfil.jpg" width="120" alt="Souly, mascote do EcoPulse">
</p>

## Como Usar

| Recurso | Acesso / situação |
| --- | --- |
| Repositório do front-end | [Souly-Sprint04 no GitHub](https://github.com/Gabriel-Oliveira0611/Souly-Sprint04) |
| Aplicação na Vercel | **Publicação em preparação. A URL pública será informada após o deploy.** |
| API Java publicada | [URL base da API](https://ecopulse-soulup-api.onrender.com/api/v1) |
| Documentação da API | [Swagger UI](https://ecopulse-soulup-api.onrender.com/swagger-ui/index.html) |
| Código-fonte da API | [ChallengeEcopulseMaven](https://github.com/pedrohcnascimento/ChallengeEcopulseMaven) |
| Apresentação da Sprint 4 no YouTube | **Não entregue nesta Sprint, por decisão da equipe.** |

O código-fonte da versão estável está na branch `main`. A implementação de integração com a API e as verificações automatizadas estão documentadas em [Testes e evidências](docs/TESTES.md). A entrega desta Sprint não inclui vídeo de apresentação.

### Instalar e executar

Use Node.js 24.15 ou superior da linha 24. Também são compatíveis as linhas 22 a partir de 22.22.2 e 26 ou superior, conforme as dependências de testes. A instalação deve ocorrer na pasta que contém `package.json`.

~~~bash
git clone https://github.com/Gabriel-Oliveira0611/Souly-Sprint04.git
cd Souly-Sprint04
npm ci
npm run dev
~~~

Abra no navegador o endereço informado pelo Vite no terminal, normalmente `http://localhost:5173`.

A URL pública da API já é o padrão. Para alterá-la, copie .env.example para .env e ajuste:

~~~dotenv
VITE_API_BASE_URL=https://ecopulse-soulup-api.onrender.com/api/v1
~~~

Inclua /api/v1 no final, sem /swagger-ui. Reinicie o Vite depois de alterar o .env. Essa variável recebe a URL pública do serviço; a configuração do banco pertence ao backend.

### Experimentar a integração

1. Acesse Recompensas e cadastre um benefício com nome, tipo e valor inteiro.
2. Acesse Missões → Nova missão.
3. Informe título, tipo, início e selecione ao menos uma recompensa. O término é opcional.
4. Após salvar, a aplicação abre os detalhes da missão retornada pela API.
5. Recarregue a página para consultar novamente o servidor.
6. Use Editar missão, Ativar/Desativar missão ou Excluir missão para exercitar PUT, PATCH e DELETE. A exclusão exige confirmação na interface.

As páginas realizam operações reais no backend. O catálogo não representa resgate financeiro em parceiros. A interface desta entrega cobre a gestão de missões e recompensas; chat com IA, autenticação e participação individual não foram adicionados.

### Publicar na Vercel

1. Na Vercel, importe o repositório `Gabriel-Oliveira0611/Souly-Sprint04`.
2. Selecione `main` como branch de produção e a pasta que contém `package.json` como diretório raiz.
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

Para executar as verificações em sequência:

~~~bash
npm run check
~~~

Na revisão de 03/11/2026, a [execução da CI na branch main](https://github.com/Gabriel-Oliveira0611/Souly-Sprint04/actions/runs/41724340723) concluiu instalação, TypeScript, lint, 37 testes e build de produção. O registro completo e os limites dessa verificação estão em [docs/TESTES.md](docs/TESTES.md).

O build gera `dist`. O comando `npm run preview` serve o último build local.

Os testes automatizados usam respostas controladas e não alteram o banco remoto. Consulte docs/TESTES.md para a distinção entre esses testes e a validação manual com a API publicada.

## Autores e Créditos

| Foto | Nome | RM | Turma | Perfis |
| --- | --- | --- | --- | --- |
| <img src="public/images/gabriel.jpg" width="64" alt="Gabriel"> | Gabriel Pereira de Oliveira | 572262 | 1TDSPW | [GitHub](https://github.com/Gabriel-Oliveira0611) · [LinkedIn](https://www.linkedin.com/in/gabriel-oliveira-1aa4bb224/) |
| <img src="public/images/adalto.jpg" width="64" alt="Adalto"> | Adalto Massahiro Nagabe | 572298 | 1TDSPW | [GitHub](https://github.com/AdaltoNagabe) · [LinkedIn](https://www.linkedin.com/in/adalto-massashiro-nagabe-149685104/) |
| <img src="public/images/pedro.jpg" width="64" alt="Pedro"> | Pedro Henrique Carvalho | 570492 | 1TDSPW | [GitHub](https://github.com/pedrohcnascimento) · [LinkedIn](https://www.linkedin.com/in/pedrohenriquecn07/) |
| <img src="public/images/murillo.jpg" width="64" alt="Murillo"> | Murillo Siviero Lopes | 572724 | 1TDSPW | [GitHub](https://github.com/MurilloSLopes) · [LinkedIn](https://www.linkedin.com/in/murillo-llopes-23out99/) |
| <img src="public/images/kaua.jpg" width="64" alt="Kauã"> | Kauã Barros Ferreira | 571801 | 1TDSPW | [GitHub](https://github.com/KauaBF) · [LinkedIn](https://www.linkedin.com/in/kau%C3%A3-barros-ferreira-161a3a36b/) |

Dados e mídias preservados da entrega anterior. Origem do projeto: [EcoPulse original](https://github.com/Gabriel-Oliveira0611/Challenge01-Front-end-design-engineering), referência 97088656fd21eefc568244ad59b647cd528ad590.

## Contato

O contato com a equipe pode ser realizado pelos perfis do GitHub e do LinkedIn indicados na tabela acima e nas páginas Contato e Integrantes da aplicação.

## Entrega

Consulte a [matriz de requisitos](docs/REQUISITOS.md) e as [orientações de entrega](docs/ENTREGA.md). A submissão consiste em um único ZIP de até 50 MB, com os arquivos do projeto e sem `node_modules`, enviado pelo Portal do Aluno. O histórico de desenvolvimento está disponível no repositório público.

## Documentação complementar

- [Requisitos e evidências da Sprint 4](docs/REQUISITOS.md).
- [Testes automatizados e validação funcional](docs/TESTES.md).
- [Publicação e geração do arquivo de entrega](docs/ENTREGA.md).

## Referências técnicas

- [react.dev/reference/react](https://react.dev/reference/react)
- [reactrouter.com/start/declarative/routing](https://reactrouter.com/start/declarative/routing)
- [vite.dev/guide/env-and-mode](https://vite.dev/guide/env-and-mode)
- [tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)
- [vercel.com/docs/frameworks/frontend/vite](https://vercel.com/docs/frameworks/frontend/vite)
