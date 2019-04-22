importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/2.09afdfe987b3a53f1741.js",
    "revision": "2776d17ef92183804cf56f3b8ddf1cac"
  },
  {
    "url": "/_nuxt/4.2aed7d2692cf31da25f5.js",
    "revision": "e3232eed1aa121e4f36bac2083bde5d3"
  },
  {
    "url": "/_nuxt/app.29b703b9819235cafb69.js",
    "revision": "b7ea8f06008739c4d20105f5aaf32a8e"
  },
  {
    "url": "/_nuxt/app.863f69aafe7e0a94c8f9e29e7a072502.css",
    "revision": "863f69aafe7e0a94c8f9e29e7a072502"
  },
  {
    "url": "/_nuxt/lang-en.e05e6491319a4100f22d.js",
    "revision": "b4d4fd4b9883fda053807bfe3720059f"
  },
  {
    "url": "/_nuxt/lang-zh.f05d90055f39f5ebd964.js",
    "revision": "9fbfdd62ab9b18991209fdaf67857a94"
  },
  {
    "url": "/_nuxt/layouts/default.e37fe514dc5e5a0eae9f.js",
    "revision": "157dc6030a8c412a3ca850af19968029"
  },
  {
    "url": "/_nuxt/manifest.a375de30572e7697c29c.js",
    "revision": "15fb7b64fa7eeaabf2991a27dae6dcd5"
  },
  {
    "url": "/_nuxt/vendor.e36473cf81007725874d.js",
    "revision": "d8af9428c4082510e78b60404c02a85a"
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





