# Testes e evidências — EcoPulse | Sprint 4

**Data da revisão:** 03/11/2026  
**Versão de código verificada:** [`8550e85`](https://github.com/Gabriel-Oliveira0611/Souly-Sprint04/commit/8550e85fffdc4b81d219e4e8bc880df95dbddb12)  
**Registro reproduzível:** [GitHub Actions — Qualidade do front-end](https://github.com/Gabriel-Oliveira0611/Souly-Sprint04/actions/runs/41726258831)

## Verificação automatizada da main

A execução consultada terminou com a conclusão **success**. O job `check` executou `npm ci` e `npm run check` em Ubuntu, com Node.js 24.22.0 e npm 11.19.1.

| Etapa            | Comando             | Resultado registrado                 |
| ---------------- | ------------------- | ------------------------------------ |
| Instalação       | `npm ci`            | Concluída                            |
| Tipagem          | `npm run typecheck` | Aprovada                             |
| Análise estática | `npm run lint`      | Zero erros e zero avisos do Oxlint   |
| Testes           | `npm test`          | 37 testes aprovados em três arquivos |
| Produção         | `npm run build`     | Build concluído; saída em `dist`     |

O resultado se refere ao código identificado acima. Alterações posteriores devem ser verificadas pela execução correspondente da CI.

## Distribuição dos testes

| Arquivo                                               | Quantidade | Comportamentos exercitados                                                                                                                               |
| ----------------------------------------------------- | ---------: | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [http.test.ts](../src/services/http.test.ts)          |          8 | Envio de JSON e cabeçalhos, DELETE com 204, detalhes de validação, erro HTML, resposta inválida, falha de rede, cancelamento e timeout                   |
| [validation.test.ts](../src/utils/validation.test.ts) |         15 | IDs de rota, conversão de datas, associação obrigatória de recompensa, intervalo de datas, normalização e limites inteiros                               |
| [app.test.tsx](../src/test/app.test.tsx)              |         14 | Navegação, filtros, vazio, erro e nova tentativa, detalhes, IDs inválidos, cadastros, edição, mudança de status, exclusão com confirmação e conflito 409 |
| **Total**                                             |     **37** |                                                                                                                                                          |

A configuração dos testes utiliza Vitest, React Testing Library, user-event e jsdom. Os testes substituem as respostas de `fetch` e não escrevem no banco remoto. Esses resultados demonstram os comportamentos exercitados no ambiente de teste; não comprovam a disponibilidade contínua da API ou da publicação na Vercel.

## Registro de validação manual com a API Java

A validação manual já registrada no projeto utilizou a interface de desenvolvimento conectada à API pública, sem proxy local:

`https://ecopulse-soulup-api.onrender.com/api/v1`

| Operação observada         | Resultado registrado                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `GET /missions`            | Listagem da missão preexistente Desafio da Reciclagem                                 |
| `GET /missions/1`          | Abertura de regras, datas, status e recompensa EcoPontos                              |
| `POST /rewards`            | Cadastro de Selo Guardião da Água, tipo SELO, valor 1, ID retornado 2                 |
| `POST /missions`           | Cadastro de Economize água no dia a dia, vinculada à recompensa 2, com ID retornado 2 |
| `PUT /missions/2`          | Atualização da descrição, confirmada ao reabrir os detalhes                           |
| `PATCH /missions/2/status` | Alteração da missão para ATIVA, refletida na interface                                |

Os resultados acima preservam o registro de validação anterior desta Sprint. Eles não representam uma nova execução no ambiente publicado. A exclusão e o conflito 409 estão cobertos por testes com respostas controladas; não foram apresentados como exclusões reais de registros existentes.

## Registro de revisão responsiva

A revisão visual registrada utilizou Chromium e incluiu a página inicial e as telas de cadastro. Os formulários de missão e recompensa foram inspecionados nas larguras de 320, 480, 768, 992 e 1440 px. Nessa revisão, os campos do formulário de missão permaneceram dentro dos limites do formulário após o ajuste de largura mínima dos fieldsets.

Esse registro se limita às telas e larguras inspecionadas. Os testes automatizados desta versão não constituem uma auditoria visual completa em aparelhos físicos ou em todos os navegadores.

## Reprodução local

Na raiz do projeto:

```bash
npm ci
npm run check
```

Para visualizar o build de produção:

```bash
npm run preview
```

Abra a URL informada no terminal. O script `preview` exige um build já gerado; `npm run check` realiza essa etapa.

## Validação do ambiente publicado

**Endereço verificado:** [EcoPulse na Vercel](https://souly-sprint04.vercel.app)  
**Data:** 03/11/2026

A conferência foi realizada no navegador Edge, acessando o domínio público da aplicação.

| Cenário | Resultado observado |
| --- | --- |
| Acesso público | Página inicial aberta sem tela de autenticação da publicação |
| Páginas institucionais | Sobre, Integrantes, FAQ e Contato abertas pelo menu, com seus conteúdos |
| Listagem de missões | Carregamento de Desafio da Reciclagem e Economize água no dia a dia |
| Listagem de recompensas | Carregamento de EcoPontos e Selo Guardião da Água |
| Detalhe de missão | `/missoes/2` exibiu descrição, regras, datas, status e recompensa vinculada |
| Atualização de rota profunda | `/missoes/2` voltou a exibir os detalhes após recarregar a página, sem erro de rota 404 |
| Detalhe de recompensa | `/recompensas/2` exibiu Selo Guardião da Água, tipo SELO, valor 1 e condições |
| Comunicação com a API | As consultas pelo front-end publicado retornaram dados; não houve bloqueio de CORS nessas leituras |
| Apresentação visual | A página inicial foi inspecionada na janela de desktop, com estilos e imagem do Souly renderizados |

Esta conferência cobriu acesso, navegação e leitura. Os resultados das operações de escrita constam dos testes automatizados e do registro manual anterior descritos acima; essas operações não foram repetidas no banco remoto nesta etapa. A revisão responsiva anterior permanece identificada em sua seção própria.

A persistência após reinício do serviço depende da configuração do banco e do perfil do backend; esse comportamento não é demonstrado pelos testes automatizados do front-end.
