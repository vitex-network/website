importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/3.f9c46fd5344a11eda750.js",
    "revision": "33898f6c977953f50fa49320b5d885d1"
  },
  {
    "url": "/_nuxt/app.8f2d9c76ac7157d8ccc025b40925d50a.css",
    "revision": "8f2d9c76ac7157d8ccc025b40925d50a"
  },
  {
    "url": "/_nuxt/app.fae187ac1bca697f2090.js",
    "revision": "71586deab5fa4c6af1510fe2b9d6102b"
  },
  {
    "url": "/_nuxt/lang-en.126db9c26a2bf7cddf22.js",
    "revision": "0d8eed68e176fb1de2c0f8b99277d470"
  },
  {
    "url": "/_nuxt/lang-zh.e4f818ee8899a5d81750.js",
    "revision": "8f853a61cf0518b6529963d8db125e60"
  },
  {
    "url": "/_nuxt/layouts/default.0b0a2c5682a254e1b45d.js",
    "revision": "323162d55be674d0da82ded9e16371ee"
  },
  {
    "url": "/_nuxt/manifest.e8d3740402622abd7f48.js",
    "revision": "180493fcdae18e962a0332ea7be78060"
  },
  {
    "url": "/_nuxt/vendor.2818b813d7b756db8adb.js",
    "revision": "ecc88f830493322859c708c9b7d6dbac"
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





