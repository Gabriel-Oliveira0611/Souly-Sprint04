# Critérios da Sprint 4 — situação da implementação

Fonte: enunciado FIAP, páginas 75 a 92. Os estados abaixo descrevem evidências; não garantem nota.

| Critério | Pontos | Evidência no código | Situação |
| --- | ---: | --- | --- |
| Rotas estáticas e dinâmicas | 10 | App.tsx, /missoes/:id, /recompensas/:id, useParams, validação de IDs e redirecionamentos | Implementado |
| Tipos TypeScript | 10 | types/api.ts: interfaces, union de status/estado, intersection de entradas, Omit e genéricos | Implementado com strict |
| Tailwind e responsividade | 15 | Classes responsivas; menu acessível; grades de listagem e formulários | Implementado; inspeção visual documentada |
| Vercel | 10 | vercel.json e instruções de publicação no README | Configuração pronta; publicação e URL pendentes |
| Integração API | 30 | services/http.ts, missions.ts, rewards.ts; GET, POST, PUT, PATCH e DELETE; loading/erro/vazio | Implementado; testes descritos em TESTES.md |
| Versionamento | 10 | Repositório existente e workflow de CI | Enviar alterações e conferir contribuição real de cada integrante |
| README | 10 | Descrição, tecnologias, estrutura, autores, fotos, links e contato | Conteúdo preparado; URLs de Vercel e vídeo pendentes |
| Vídeo | 5 | Roteiro de até 3 minutos em ENTREGA.md | Gravação/publicação pendentes |

## Regras transversais

- React + Vite + TypeScript e SPA preservados.
- Estilização da aplicação exclusivamente com Tailwind CSS.
- Fetch nativo; sem Axios, Bootstrap, Material UI, Chakra UI ou jQuery.
- Home, Sobre, Integrantes, FAQ e Contato mantidas.
- Missões e Recompensas são duas páginas extras funcionais, além das páginas de apresentação do Souly.
- Integrantes apresentam nome, foto, RM, turma, GitHub e LinkedIn.
- Pelo menos uma listagem, um detalhe e uma escrita estão implementados para a API Java remota.
- O frontend não usa dados fictícios como substituição silenciosa para falhas da API.

## O que ainda depende da equipe

1. Incorporar e enviar o código ao repositório público correto.
2. Manter GitFlow e contribuições reais: pelo menos cinco commits por integrante e quinze no total. Com cinco integrantes, o mínimo individual resulta em pelo menos 25 commits.
3. Publicar na Vercel, garantir acesso público e inserir a URL no README.
4. Gravar até três minutos demonstrando a integração e publicar no YouTube.
5. Atualizar o README com o vídeo e conferir os dados dos integrantes.
6. Gerar o ZIP final atualizado, sem node_modules, e enviá-lo no Portal do Aluno.

Esta versão não fabrica commits nem substitui a participação individual exigida pela FIAP.
