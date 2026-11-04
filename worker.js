/*
  Missão 100K — intermediário da IA (Cloudflare Worker, plano gratuito)

  Para que serve: o Groq não aceita chamadas feitas direto do navegador e a chave
  da API não pode ficar dentro do app. Este Worker guarda a chave em segredo na
  Cloudflare, só atende o seu app e repassa o pedido para o Groq.

  Variáveis que você cria em Settings › Variables and Secrets:
    API_KEY           (Secret) a chave do Groq, começa com gsk_
    APP_SENHA         (Secret) uma senha que você inventa; é a mesma que vai no app
    ORIGEM_PERMITIDA  (Text)   o endereço do seu app, ex.: https://seu-usuario.github.io
                               (vários separados por vírgula; vazio libera qualquer site)
    API_URL           (Text, opcional) outro endpoint compatível com OpenAI.
                               Padrão: https://api.groq.com/openai/v1/chat/completions
*/
export default {
  async fetch(request, env) {
    const origem = request.headers.get('Origin') || '';
    const permitidas = (env.ORIGEM_PERMITIDA || '').split(',').map((s) => s.trim().replace(/\/$/, '')).filter(Boolean);
    const origemOk = permitidas.length === 0 || permitidas.includes(origem);
    const cors = {
      'Access-Control-Allow-Origin': origemOk && origem ? origem : (permitidas[0] || '*'),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return new Response('Use POST', { status: 405, headers: cors });
    if (!origemOk) return new Response('Origem não permitida', { status: 403, headers: cors });
    if (!env.APP_SENHA || (request.headers.get('Authorization') || '') !== 'Bearer ' + env.APP_SENHA) {
      return new Response('Senha do app inválida', { status: 401, headers: cors });
    }
    if (!env.API_KEY) return new Response('Falta a variável API_KEY no Worker', { status: 500, headers: cors });
    const corpo = await request.text();
    if (corpo.length > 200000) return new Response('Pedido grande demais', { status: 413, headers: cors });
    const destino = env.API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const r = await fetch(destino, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + env.API_KEY },
      body: corpo,
    });
    const h = new Headers(cors);
    h.set('Content-Type', r.headers.get('Content-Type') || 'application/json');
    return new Response(r.body, { status: r.status, headers: h });
  },
};
