const CACHE_NAME = 'terco-digital-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Ocorre quando a aplicação é instalada no telemóvel/browser
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Ficheiros guardados no cache para uso offline');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Interceta os pedidos à rede
self.addEventListener('fetch', event => {
  // Ignora o pedido se for para a API externa (o nosso script.js já trata disso)
  if (event.request.url.includes('api.npoint.io')) {
    return;
  }

  // Tenta responder com o ficheiro em cache. Se não encontrar, vai à internet.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Limpa caches antigos (útil para atualizações futuras)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});