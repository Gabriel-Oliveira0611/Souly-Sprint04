# Requisitos e evidências — Sprint 4

**Projeto:** EcoPulse | SoulUp Challenge  
**Disciplina:** Front-End Design Engineering — FIAP  
**Turma:** 1TDSPW  
**Revisão:** 03/11/2026

Esta matriz relaciona o enunciado de Front-End Design Engineering, páginas 75 a 92, aos arquivos e aos registros verificáveis do projeto. A pontuação representa o peso definido no enunciado; a atribuição da nota cabe à avaliação docente.

## Matriz de critérios

| Critério | Peso | Evidências | Situação documentada |
| --- | ---: | --- | --- |
| Rotas estáticas e dinâmicas | 10 | [App.tsx](../src/App.tsx), rotas `/missoes/:id` e `/recompensas/:id`, validação de IDs, redirecionamentos e mensagens | Implementado; navegação coberta por testes |
| Tipagem TypeScript | 10 | [types/api.ts](../src/types/api.ts), interfaces, union types, intersection types e genéricos | Implementado; TypeScript aprovado na CI |
| Tailwind CSS e responsividade | 15 | Classes responsivas de componentes, páginas e formulários; menu para celular | Implementado; revisão visual registrada em TESTES.md |
| Publicação na Vercel | 10 | [vercel.json](../vercel.json), build e fallback de SPA | Publicado; acesso público, navegação e leitura da API verificados |
| Integração com API Java | 30 | [http.ts](../src/services/http.ts), [missions.ts](../src/services/missions.ts), [rewards.ts](../src/services/rewards.ts), tipagem e estados de carregamento, erro e vazio | Implementado; testes automatizados e registro de validação manual |
| Versionamento no GitHub | 10 | [Repositório público](https://github.com/Gabriel-Oliveira0611/Souly-Sprint04), branches `main`, `develop` e `feature/*`, histórico de commits e CI | Histórico publicado; contagem registrada abaixo |
| README técnico e informativo | 10 | [README](../README.md): descrição, tecnologias, estrutura, autores, imagens, execução e contato | Documentação revisada com a URL da Vercel; vídeo não entregue |
| Apresentação em vídeo | 5 | Situação declarada na seção Como Usar do README | Não entregue, por decisão da equipe |

## Páginas exigidas

| Exigência | Rotas implementadas |
| --- | --- |
| Página inicial | `/`; `/home` redireciona para `/` |
| Sobre a proposta | `/sobre` |
| Integrantes | `/integrantes` |
| Perguntas frequentes | `/faq` |
| Contato | `/contato` |
| Páginas da solução | `/missoes` e `/recompensas`, com listagens, formulários e detalhes |
| Conteúdo complementar da solução | `/sobre-souly` e `/souly-como-guia` |

A página de integrantes e a tabela do README apresentam nome, foto, RM, turma e links profissionais do GitHub e do LinkedIn.

## Integração com o backend

A URL base configurada é `https://ecopulse-soulup-api.onrender.com/api/v1`.

| Necessidade do enunciado | Implementação |
| --- | --- |
| Consultar uma listagem | `GET /missions` e `GET /rewards` |
| Consultar detalhes | `GET /missions/{id}` e `GET /rewards/{id}` |
| Realizar uma escrita | Cadastro com POST, edição com PUT, alteração de status de missão com PATCH e exclusão com DELETE |
| Organizar as chamadas HTTP | Serviços específicos em `src/services` |
| Exibir carregamento, falha e resposta vazia | `useRequest`, `ApiState` e estados tipados da requisição |
| Tipar respostas e dados de envio | Interfaces e tipos em `src/types/api.ts` |
| Compartilhar feedback | `FeedbackProvider` e hook `useFeedback` |

As chamadas usam Fetch nativo. Os testes automatizados usam respostas controladas, conforme descrito em [TESTES.md](TESTES.md).

## Histórico de versionamento

O fluxo utiliza `feature/*` para desenvolvimento, `develop` para integração e `main` para a versão estável.

Na revisão do commit [`8550e85`](https://github.com/Gabriel-Oliveira0611/Souly-Sprint04/commit/8550e85fffdc4b81d219e4e8bc880df95dbddb12), foram encontrados **28 commits** alcançáveis pela `main`, com a seguinte autoria registrada:

| Integrante | Nome registrado nos commits | Quantidade |
| --- | --- | ---: |
| Gabriel Pereira de Oliveira | Gabriel-Oliveira0611 | 8 |
| Adalto Massahiro Nagabe | AdaltoNagabe | 5 |
| Pedro Henrique Carvalho | PHCN | 5 |
| Murillo Siviero Lopes | MurilloSLopes | 5 |
| Kauã Barros Ferreira | KauaBF | 5 |
| **Total** | | **28** |

A contagem corresponde ao registro consultado em 03/11/2026, antes da incorporação desta revisão da documentação. O enunciado exige ao menos cinco commits por integrante e quinze no total. A avaliação qualitativa das contribuições é feita pelo histórico do repositório.

## Situação final desta revisão

- Código-fonte publicado em repositório público.
- CI da versão estável concluída com sucesso, incluindo 37 testes.
- Documentação atualizada para o repositório da Sprint 4.
- Aplicação publicada em [https://souly-sprint04.vercel.app](https://souly-sprint04.vercel.app), com endereço registrado na seção Como Usar do README.
- Vídeo da Sprint 4 não incluído nesta entrega.

O vídeo possui peso de 5 pontos no critério específico e o link do YouTube integra o item Como Usar do README. A declaração de ausência registra a situação da entrega e não atende esses itens do enunciado.
