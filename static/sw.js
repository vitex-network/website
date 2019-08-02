importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/2.21effc0081b7d50f1e37.js",
    "revision": "8a4c1e48c515f9b5e837342d9557b439"
  },
  {
    "url": "/_nuxt/4.571bb99afcbae2a5a3df.js",
    "revision": "e0c74698e3a96ec01869945d9ea63e2b"
  },
  {
    "url": "/_nuxt/app.76c0647929d7d54fa9a6b43e17a2cf72.css",
    "revision": "76c0647929d7d54fa9a6b43e17a2cf72"
  },
  {
    "url": "/_nuxt/app.d0c5d1d609e69e96760c.js",
    "revision": "0f0f03ae6cd5f0c0da400399a6798115"
  },
  {
    "url": "/_nuxt/lang-en.6ff3cda50f0ab5019188.js",
    "revision": "f29c78935d2e1552fe965f4126fbd4c8"
  },
  {
    "url": "/_nuxt/lang-zh.33de84b71d83d2403bc6.js",
    "revision": "c28f7efe84179c4b6b6be2c0d9e96905"
  },
  {
    "url": "/_nuxt/layouts/default.5a56a239878d38bac61d.js",
    "revision": "6f2973206ce14b5759019b718db1ff2c"
  },
  {
    "url": "/_nuxt/manifest.0497c89f3978c4f87843.js",
    "revision": "9647f1cc7fac9c24e16a8b06cbcbefe5"
  },
  {
    "url": "/_nuxt/vendor.c6e5250f69fc2b50a228.js",
    "revision": "81e2fc97d710359ddf0ce803d2b213ad"
  }
], {
  "cacheId": "vitex-page",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')





