// Lift log offline support.
// Serves the app from the phone's cache straight away (so it opens with no signal),
// then quietly fetches any newer version for next time.
// When you change the app, bump the version below so old files are cleared.
const CACHE = "liftlog-v3";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];
const APP_PAGE = new URL("./index.html", self.location).href;

self.addEventListener("install", event => {
  // cache: "reload" skips the browser's own cache so a new version is never mixed with old files
  event.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(FILES.map(u => new Request(u, {cache: "reload"}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("liftlog-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  // Opening the app (with or without "index.html" or a ?query) always means the app page
  const isApp = req.mode === "navigate" && (url.pathname.endsWith("/") || url.pathname.endsWith("/index.html"));
  if (req.mode === "navigate" && !isApp) return;
  const key = isApp ? APP_PAGE : url.origin + url.pathname;

  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(key);
    // cache: "no-cache" checks with the server, so an old copy can't overwrite a newer one
    const network = fetch(key, {cache: "no-cache"}).then(res => {
      if (res && res.ok) cache.put(key, res.clone());
      return res;
    }).catch(() => undefined);
    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    return (await network) || new Response("Offline", {status: 503, statusText: "Offline"});
  }));
});
