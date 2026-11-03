# Finalização e apresentação — Sprint 4

## Incorporar os arquivos

Se você já tem um clone atualizado, copie os arquivos do pacote sobre a pasta do projeto, preservando a pasta .git do seu clone. Não copie node_modules ou dist de outra máquina.

O pacote preserva as fotos e os vídeos originais e adiciona src/services, src/types, src/hooks, src/contexts, os novos componentes e as páginas de gestão. O README foi reescrito para a Sprint 4.

## GitFlow

Use main para a versão estável, develop para integração e feature/* para o trabalho em andamento. Atualize sua cópia antes de incorporar alterações. Com uma árvore de trabalho limpa:

~~~bash
git switch main
git pull
~~~

Se develop já existe, mude para ela e atualize. Se ainda não existe no repositório, crie a branch a partir de main:

~~~bash
git switch -c develop
git push -u origin develop
~~~

Depois crie a branch de trabalho:

~~~bash
git switch -c feature/sprint04-integracao-api
~~~

Copie os arquivos atualizados, revise git diff, instale com npm ci e execute npm run check. Registre alterações reais em commits claros e abra um pull request para develop. Depois da revisão, prepare a release para main e publique a branch validada.

Não execute git switch -c sobre uma branch que já existe. Não altere autores de commits para simular participação. Cada integrante deve compreender e contribuir com o trabalho que registra.

## Checklist de publicação

- [ ] Código atualizado no GitHub e repositório acessível para correção.
- [ ] Participação de todos: cinco commits relevantes por integrante.
- [ ] API e banco remoto operacionais durante a avaliação.
- [ ] VITE_API_BASE_URL configurada na Vercel com /api/v1.
- [ ] Projeto publicado com build npm run build e pasta dist.
- [ ] URL definitiva da Vercel no README, seção Como Usar.
- [ ] Rotas profundas continuam funcionando ao atualizar a página.
- [ ] GET de lista e detalhe e uma escrita funcionam no domínio publicado.
- [ ] Vídeo de até três minutos no YouTube e link no README.
- [ ] ZIP final de até 50 MB com src, public, package.json, lock e configurações.
- [ ] ZIP sem node_modules, dist, credenciais e arquivos temporários.
- [ ] ZIP enviado no Portal do Aluno, na disciplina correta.

## Roteiro de vídeo — até 3 minutos

| Tempo | Demonstração |
| --- | --- |
| 0:00–0:20 | Apresentar EcoPulse, o problema e a equipe |
| 0:20–0:40 | Navegar pelas páginas institucionais e pelo menu |
| 0:40–1:05 | Mostrar listagem de missões da API e abrir detalhes pela rota com ID |
| 1:05–1:35 | Cadastrar recompensa e missão vinculada |
| 1:35–2:00 | Mostrar o registro após recarregar, editar e alterar o status |
| 2:00–2:25 | Mostrar o layout em celular e estados de validação |
| 2:25–2:45 | Explicar React, Vite, TypeScript, Tailwind e camada de serviços com Fetch |
| 2:45–3:00 | Exibir os links públicos da Vercel, API e GitHub |

Prepare dados de demonstração antes de gravar para respeitar o limite. O objetivo é mostrar a persistência e o funcionamento desta versão, sem apresentar os vídeos antigos do Souly como prova da integração.
