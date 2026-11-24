# RITMO

Site de corrida (PWA): calculadora, GPS ao vivo com mapa, gráficos, metas e conquistas.

## Publicar no GitHub Pages
1. Crie um repositório no GitHub e envie todos estes arquivos para a raiz dele.
2. Em Settings > Pages, escolha "Deploy from a branch", branch `main`, pasta `/ (root)`.
3. No iPhone, abra o endereço no **Safari** > Compartilhar > **Adicionar à Tela de Início**.

## Firebase (opcional, para guardar os dados na nuvem)
1. Authentication > Sign-in method > ative **E-mail/senha**.
2. Authentication > Settings > Authorized domains: adicione `SEU-USUARIO.github.io`.
3. Preencha `apiKey`, `authDomain`, `projectId` e `appId` no começo de `firebase.js`.

## Plano de treino
O app lê o arquivo `treino.json`. Para atualizar o plano, substitua o arquivo no GitHub.
Se alterar qualquer arquivo, mude `V = 'ritmo-v1'` em `sw.js` (ex.: `ritmo-v2`) para o celular baixar a versão nova.
