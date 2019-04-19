importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/2.aa4e48c0b279235f590b.js",
    "revision": "1b584aec9adcdd554df517d4feb33dbf"
  },
  {
    "url": "/_nuxt/4.2aed7d2692cf31da25f5.js",
    "revision": "e3232eed1aa121e4f36bac2083bde5d3"
  },
  {
    "url": "/_nuxt/app.7c11d57abacde45292ab.js",
    "revision": "a4864e3dfbd011c32a7a210f460f3e17"
  },
  {
    "url": "/_nuxt/app.863f69aafe7e0a94c8f9e29e7a072502.css",
    "revision": "863f69aafe7e0a94c8f9e29e7a072502"
  },
  {
    "url": "/_nuxt/lang-en.65aa58e3b95601811ff4.js",
    "revision": "08b828b4e51a52b72d601d5a13ff4397"
  },
  {
    "url": "/_nuxt/lang-zh.4e1245465d742d7115a3.js",
    "revision": "47e9095007f5047bf9909cee9c0acd96"
  },
  {
    "url": "/_nuxt/layouts/default.ce5f81d998ad1a732c1f.js",
    "revision": "bfc2a7a126c3ee83db49ddc3858b9354"
  },
  {
    "url": "/_nuxt/manifest.e6a5cf387bc782ed32cb.js",
    "revision": "c9d03e2daa53bd7a906aa85041725ec9"
  },
  {
    "url": "/_nuxt/vendor.17927d5544a2dabaa3ea.js",
    "revision": "734dc43dbbfbc4d60d1f00cba5cc63ef"
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





