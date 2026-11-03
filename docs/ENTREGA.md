# Entrega — EcoPulse | Sprint 4

**Disciplina:** Front-End Design Engineering  
**Instituição:** FIAP  
**Turma:** 1TDSPW  
**Data da revisão:** 03/11/2026

## Identificação da entrega

Aplicação web do SoulUp Challenge para gestão de missões sustentáveis e recompensas. O front-end utiliza React, Vite, TypeScript e Tailwind CSS e consome a API Java do grupo por meio de requisições HTTP com Fetch nativo.

| Item | Referência / situação |
| --- | --- |
| Código-fonte | [Souly-Sprint04](https://github.com/Gabriel-Oliveira0611/Souly-Sprint04) |
| Branch estável | `main` |
| Integração | `develop` |
| API Java | [URL base publicada](https://ecopulse-soulup-api.onrender.com/api/v1) |
| Contratos e operações da API | [Swagger UI](https://ecopulse-soulup-api.onrender.com/swagger-ui/index.html) |
| CI da versão revisada | [Execução aprovada na main](https://github.com/Gabriel-Oliveira0611/Souly-Sprint04/actions/runs/41724340723) |
| Publicação na Vercel | Em preparação; URL pública ainda não informada |
| Vídeo de apresentação da Sprint 4 | Não entregue, por decisão da equipe |

A seção **Como Usar** do [README](../README.md#como-usar) concentra os acessos destinados à avaliação.

## Composição do projeto

| Conteúdo | Finalidade |
| --- | --- |
| `src/` | Componentes, páginas, serviços HTTP, tipos, hooks, contextos, validações e testes |
| `public/` | Imagens, fotos dos integrantes e mídias institucionais |
| `docs/` | Requisitos, testes e orientações de entrega |
| `package.json` e `package-lock.json` | Scripts, dependências e instalação reproduzível |
| Configurações do Vite, Vitest e TypeScript | Desenvolvimento, testes e compilação |
| `vercel.json` | Build e fallback de navegação da SPA |
| `.github/workflows/ci.yml` | Verificações automatizadas do repositório |
| `README.md` | Guia técnico e informativo |

Os vídeos institucionais existentes em `public/videos/` fazem parte do conteúdo da aplicação. Eles não correspondem à apresentação funcional da Sprint 4 exigida no YouTube.

## Publicação na Vercel

A publicação ainda será realizada pela equipe. Utilize as configurações abaixo:

| Configuração | Valor |
| --- | --- |
| Repositório | `Gabriel-Oliveira0611/Souly-Sprint04` |
| Branch de produção | `main` |
| Framework Preset | `Vite` |
| Diretório raiz | Pasta que contém `package.json` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Variável `VITE_API_BASE_URL` | `https://ecopulse-soulup-api.onrender.com/api/v1` |

O arquivo `vercel.json` encaminha as rotas da SPA para `index.html`. Depois da publicação:

1. Abra a URL pública e confira as páginas institucionais.
2. Acesse `/missoes` e `/recompensas` e confira o carregamento da API.
3. Abra uma rota de detalhes existente e atualize a página para verificar o fallback.
4. Execute um cadastro e reabra o registro para conferir a comunicação com o backend.
5. Confirme que o site pode ser acessado sem autenticação de acesso à publicação.
6. Insira a URL real na seção **Como Usar** do README e atualize a situação do deploy nesta documentação.

Caso o navegador apresente bloqueio de CORS, ajuste a origem permitida no backend para incluir o domínio publicado.

## Conferência e geração do ZIP

Após atualizar os links finais, execute na raiz do projeto:

~~~bash
npm ci
npm run check
~~~

Registre a versão final da documentação, integre-a à `main` e confirme que a cópia de trabalho está limpa:

~~~bash
git status --short
~~~

Com a versão correta já registrada na `main`, gere o pacote pelos arquivos versionados:

~~~bash
git archive --format=zip --prefix=ecopulse-sprint04/ --output=../EcoPulse_Sprint04_Entrega.zip main
~~~

O comando cria o arquivo um nível acima da pasta do repositório. Ele inclui o conteúdo registrado no Git, preserva a organização do projeto e deixa de fora `node_modules`, `dist` e outros arquivos locais ignorados. Alterações ainda não commitadas não entram no pacote.

Abra o ZIP gerado e confira a presença de `src`, `public`, `package.json`, arquivo de lock, configurações e README. O limite do enunciado é **50 MB**. O histórico Git permanece disponível no repositório público indicado no README.

## Submissão acadêmica

O envio deve ocorrer exclusivamente pelo **Portal do Aluno**, na área da disciplina Front-End Design Engineering, dentro do prazo definido pela FIAP.

| Verificação final | Referência |
| --- | --- |
| Projeto executável após `npm ci` | Scripts e instalação no README |
| Repositório público e histórico disponível | GitHub da equipe |
| API publicada e acessível | URL base e Swagger |
| Front-end público na Vercel e URL documentada | Finalizar após o deploy |
| ZIP completo e com até 50 MB | Arquivo gerado a partir da main |
| Apresentação no YouTube | Não incluída nesta entrega |

A ausência do vídeo é mantida de forma explícita. O requisito de apresentação em vídeo permanece não atendido.
