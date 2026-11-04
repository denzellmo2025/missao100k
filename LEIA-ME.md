# Missão 100K: versão independente

É o mesmo app, rodando sem o Claude. Os dados ficam no seu celular, ele funciona sem internet e a hospedagem é grátis.

## O que muda em relação à versão do Claude

| | Versão do Claude | Versão independente |
|---|---|---|
| Onde ficam os dados | Cofre do app, na conta do Claude | Só no seu aparelho |
| Celular e computador sincronizados | Sim | Não (use o backup) |
| Conversa com o Jurandir | IA livre, com memória | Entende frases simples de registro e "posso comprar?" |
| Indicadores | Tarefa diária com resumo e manchetes | Atualizam ao abrir: Selic, CDI e IPCA (Banco Central), dólar e Bitcoin (AwesomeAPI) |
| Depende da licença do Claude | Sim | Não |

## Passo 1: publicar na internet (grátis, uns 10 minutos)

Use GitHub Pages:

1. Crie uma conta em github.com com seu **e-mail pessoal** (não o da empresa).
2. Clique em **New repository**, dê o nome `missao100k`, deixe **Public** e clique em **Create repository**.
3. Clique em **uploading an existing file**, arraste todos os arquivos desta pasta e clique em **Commit changes**.
4. Vá em **Settings › Pages**. Em **Source**, escolha **Deploy from a branch**; em **Branch**, escolha `main` e `/ (root)`; clique em **Save**.
5. Em um ou dois minutos aparece o endereço: `https://SEU-USUARIO.github.io/missao100k/`

O repositório público guarda só o código. Seus dados nunca vão para lá.

Alternativas também grátis: **Netlify Drop** (app.netlify.com/drop, é só arrastar a pasta) ou **Cloudflare Pages**.

## Passo 2: instalar no celular

**Android, jeito mais simples (recomendado):** abra o endereço no Chrome do celular, toque no menu **⋮** e em **Instalar app** (ou **Adicionar à tela inicial**). Vira um ícone com o Jurandir, abre em tela cheia e funciona sem internet.

**Android, como APK:**
1. Entre em **pwabuilder.com**, cole o endereço do passo 1 e clique em **Start**.
2. Clique em **Package for stores › Android › Generate Package** e baixe o .zip.
3. Dentro do .zip há um arquivo **.apk**. Mande para o celular, abra e permita "instalar apps desconhecidos".

O APK é um invólucro que abre o seu site, por isso o passo 1 vem antes. Se aparecer uma barra de endereço no topo do app, falta o arquivo de verificação (`assetlinks.json`) que vem no .zip do PWABuilder: siga as instruções de "Next steps" dele, que pedem para colocar esse arquivo numa pasta `.well-known` do repositório.

**iPhone:** abra no Safari, toque em **Compartilhar › Adicionar à Tela de Início**. Não existe APK no iPhone.

## Passo 3: levar seus dados

1. Abra o app instalado e vá em **Time › Meus dados › Backup › Restaurar backup**.
2. Escolha o arquivo de backup (`missao100k-backup-AAAA-MM-DD.json`).

Para gerar um backup novo da versão do Claude: lá, vá em **Time › Meus dados › Backup › Baixar backup**.

## Passo 4: backup toda semana

Vá em **Time › Meus dados › Backup › Baixar backup** e salve no Google Drive ou mande para o seu e-mail. O app avisa quando passar de 7 dias.

Limpar os dados do navegador ou desinstalar o app apaga os registros. O backup é o seu seguro.

## Domínio próprio (opcional, cerca de R$ 40 por ano)

1. Registre um domínio em registro.br (por exemplo, `missao100k.com.br`).
2. No GitHub, em **Settings › Pages › Custom domain**, digite o domínio e salve.
3. No registro.br, na área de DNS:
   - crie um registro **CNAME** `www` apontando para `SEU-USUARIO.github.io`;
   - para o domínio sem "www", crie os registros **A** que o GitHub indica na página de ajuda "Managing a custom domain for your GitHub Pages site".
4. Volte ao GitHub e marque **Enforce HTTPS**.

Se usar domínio próprio, gere o APK no PWABuilder com o endereço novo.

## Atualizar o app

Quando eu (ou você) mudar o app, substitua os arquivos no repositório em **Add file › Upload files**. O app se atualiza sozinho na próxima vez que abrir com internet.

## Ligar uma IA gratuita (opcional)

O passo a passo completo está no guia "Missão 100K: guia de instalação e IA grátis". Em resumo:
1. Crie uma chave gratuita no Groq (console.groq.com).
2. Crie um Worker gratuito na Cloudflare com o código do arquivo `worker.js` desta pasta e cadastre a chave como segredo.
3. No app, em **Time › Meus dados › Conexão com IA**, cole o endereço do Worker e a senha que você criou.

## Próximos passos possíveis

- **Sincronizar celular e computador:** dá para ligar um banco de dados gratuito (Supabase ou Firebase). Exige criar uma conta e configurar.
- **Nunca coloque uma chave de API dentro do `index.html`:** o repositório é público e qualquer pessoa conseguiria ler.

## Arquivos desta pasta

- `index.html`: o app inteiro
- `manifest.webmanifest`: nome, ícone e cores do app instalado
- `sw.js`: faz o app funcionar sem internet
- `chart.umd.js`: biblioteca de gráficos Chart.js 4.4.1 (licença MIT)
- `worker.js`: código do intermediário da IA para a Cloudflare (não contém nenhuma chave)
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`: ícones do Jurandir
