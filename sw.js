/* Missão 100K — service worker: funciona offline e se atualiza sozinho quando há internet */
const CACHE = 'missao100k-v1';
const ARQUIVOS = ['./', './index.html', './manifest.webmanifest', './chart.umd.js', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Arquivos do próprio app: tenta a internet primeiro (pega atualizações) e cai para o cache sem conexão.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((resp) => { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); return resp; })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
  );
});
