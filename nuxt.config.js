const hostname = 'https://www.vite.org';
const routes = [
  {
    url: '/',
    priority: 1,
    img: [
      {
        url: `${hostname}/icon.png`,
        caption: 'ViteX logo',
        title: 'ViteX logo'
      },
      {
        url: `${hostname}/logo_appstore.png`,
        caption: 'ViteX logo for appstore',
        title: 'ViteX logo for appstore'
      }
    ]
  },
  {
    url: '/faq',
    priority: 0.3
  }
];
const sitemapUrls = [];
const locales = [
  {
    code: 'en',
    name: 'EN',
    langFile: 'en.json'
  },
  {
    code: 'zh',
    name: '中文',
    langFile: 'zh.json'
  }
];
const defaultLocale = 'en';

routes.forEach((route) => {
  let links = locales.map((locale) => {
    let lang = locale.code;
    let url = `${hostname}/${lang}${route.url}`;
    if (defaultLocale === lang) {
      url = `${hostname}${route.url}`;
    }
    return {
      lang,
      url
    };
  });
  links.forEach(({url}) => {
    sitemapUrls.push({
      ...route,
      url,
      changefreq: 'daily',
      links: links
    });
  });
});


module.exports = {
  head: {
    title: 'A completely decentralized exchange',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'author', content: 'vite lab'},
      {name: 'keywords', content: 'vite,crypto,dag,bitcoin,vitecoin,contract platform'}
    ]
  },
  loading: {
    color: '#7FB2FE'
  },
  build: {
    extractCSS: true,
    vendor: ['babel-polyfill'],
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false // Fix bulma css warnings
        }
      }
    }
  },
  plugins: ['~/plugins/fontawesome', {src: '~/plugins/vue-headroom', ssr: false}],
  router: {
    middleware: 'i18n'
  },
  modules: [
    // '@nuxtjs/webpackmonitor',
    '@nuxtjs/pwa',
    ['nuxt-i18n', {
      locales,
      defaultLocale,
      detectBrowserLanguage: true,
      redirectCookieKey: 'redirected',
      useRedirectCookie: true,
      loadLanguagesAsync: true,
      langDir: 'locales/',
      ignorePaths: [],
      vueI18n: {
        fallbackLocale: defaultLocale,
        messages: {
          /*
          * make the default locale can work in fallback in ssr.
          * */
          en: require('./locales/en.json')
        }
      }
    }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-118987496-1'
    }],
    '@nuxtjs/sitemap'
  ],
  css: [
    '~/assets/main.scss'
  ],
  render: {
    gzip: { threshold: 1 }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: hostname,
    gzip: true,
    generate: true,
    exclude: [
      '/technology',
      '/careers',
      '/',
      '/faq'
    ].concat(locales.map((lang) => {
      return `/${lang.code}/**`;
    })).concat(locales.map((lang) => {
      return `/${lang.code}`;
    })),
    routes: sitemapUrls
  }
};
