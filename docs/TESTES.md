# Verificações realizadas em 03/11/2026

## Verificações locais

- npm ci: dependências instaladas com sucesso.
- npm run typecheck: passou com strict e noUncheckedIndexedAccess.
- npm run lint: passou sem avisos ou erros do código.
- npm test: 37 testes passaram em três arquivos.
- npm run build: build de produção concluído.

O npm exibiu um aviso sobre configuração de proxy do ambiente de execução. Não é uma falha do projeto.

## Cobertura automatizada

| Área | Comportamentos verificados |
| --- | --- |
| HTTP | JSON, cabeçalhos, POST, DELETE 204, validação 400, erro HTML, resposta inválida, falha de rede, cancelamento e timeout |
| Validação | IDs positivos seguros, associação obrigatória, datas ISO, intervalo de datas, limites inteiros de recompensa e normalização |
| Interface | Listagem, filtros, vazio, erro com nova tentativa, detalhe dinâmico, 404, ID inválido, criação de recompensa e missão, PUT, PATCH, confirmação de DELETE e recusa 409 |
| Navegação | Redirecionamentos, mensagens de sucesso e menu de celular |

Os testes usam respostas HTTP controladas. Eles não provam, isoladamente, a disponibilidade do Render, a persistência do Oracle ou o deploy na Vercel. O teste de DELETE e de conflito 409 foi feito apenas com respostas controladas.

## Verificação manual com a API publicada

A interface de desenvolvimento foi conectada à URL real https://ecopulse-soulup-api.onrender.com/api/v1. Não foi usado proxy local nem backend de exemplo para essa etapa.

- GET /missions: carregou a missão preexistente Desafio da Reciclagem.
- GET /missions/1: abriu regras, datas, status e a recompensa EcoPontos.
- POST /rewards: criou Selo Guardião da Água, tipo SELO, valor 1, retornado como ID 2.
- POST /missions: criou Economize água no dia a dia, vinculada à recompensa ID 2, retornada como ID 2 e com status INATIVA.
- PUT /missions/2: atualizou a descrição e confirmou o texto retornado ao reabrir os detalhes.
- PATCH /missions/2/status: ativou a missão; o detalhe retornou ATIVA e disponível no período atual.
- O frontend abriu os detalhes consultando novamente a API após cada cadastro e edição.

Os dois registros de demonstração permanecem no backend. Não foram removidos registros existentes.

A disponibilidade remota foi confirmada pelo navegador. Requisições diretas do terminal ao mesmo serviço excederam o tempo de espera; isso não impediu o fluxo pelo frontend.

## Revisão responsiva

Foram inspecionadas visualmente a página inicial e as telas de cadastro. Os formulários de missão e recompensa foram renderizados em quadros de 320, 480, 768, 992 e 1440 px. Os campos do formulário de missão ficaram dentro dos limites do formulário nas cinco larguras após corrigir a largura mínima dos fieldsets.

Essa revisão cobre os layouts observados no navegador Chromium; não equivale a testes completos em aparelhos físicos ou em todos os navegadores.

## Verificações ainda necessárias para a entrega

- Publicar na Vercel e repetir o fluxo de GET e escrita no domínio definitivo.
- Conferir CORS para o domínio publicado e acesso sem login ao frontend.
- Verificar a persistência após reinício do serviço conforme o banco e perfil configurados no Render.
- Conferir o vídeo, os links finais e o histórico colaborativo.
