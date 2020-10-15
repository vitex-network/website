const hostname = 'https://vitex.net';
const routes = [
  {
    url: '/',
    priority: 1,
    img: [
      {
        url: `${hostname}/icon.png`,
        caption: 'ViteX logo',
        title: 'ViteX logo'
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
    title: 'ViteX, Exchange By the Community, For the Community',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'author', content: 'vite lab'},
      {name: 'keywords', content: 'vite, vitex, crypto,dag,bitcoin,vitecoin,contract platform, vgate, vgate exchange'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/icon.png'}
    ],
  },
  loading: {
    color: '#7FB2FE'
  },
  build: {
    extractCSS: true,
    vendor: ['@babel/parser', 'axios', '~/plugins/element-ui.js'],
    babel: {
      'plugins': [['component', {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }]]
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false // Fix bulma css warnings
        }
      }
    }
  },
  plugins: ['~/plugins/fontawesome',
    { src: '~/plugins/utils.js', ssr: false },
    { src: '~/plugins/element-ui.js', ssr: true },
    {src: '~/plugins/vue-headroom', ssr: false},
    {src: '~/plugins/nuxt-swiper-plugin.js', ssr: false}],
  router: {
    middleware: 'i18n'
  },
  modules: [
    // '@nuxtjs/webpackmonitor',
    // '@nuxtjs/pwa',
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
          en: require('./locales/en.json'),
          zh: require('./locales/zh.json')
        },
        silentTranslationWarn: true
      }
    }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-144137943-1'
    }],
    '@nuxtjs/sitemap'
  ],
  css: [
    '~/assets/main.scss',
    'swiper/dist/css/swiper.css'
  ],
  render: {
    compressor: {threshold: 1}
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: hostname,
    gzip: true,
    generate: true,
    exclude: [
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
