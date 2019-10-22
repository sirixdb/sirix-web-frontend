export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  server: {
    port: 3005, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '@/plugins/dependencyContainer.ts', '@/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', ['@nuxtjs/axios',  { baseURL: 'https://localhost:9443' }], '@nuxtjs/auth', '@nuxtjs/proxy'],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    vendor: ['axios'],
    /*
     ** You can extend webpack config here
     */
    extend: function (config, {isDev, isClient}) {
      config.node = {
        fs: "empty"
      };
    }
  },
  axios: {
    baseURL: 'https://127.0.0.1:9443',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxyHeaders: true
  },
  auth: {
    strategies: {
      social: {
        _scheme: 'oauth2',
        authorization_endpoint: '/user/authorize',
        userinfo_endpoint: false,
        scope: ['create','view','modify','delete'],
        access_type: 'offline',
        access_token_endpoint: '/token',
        response_type: 'code',
        token_type: 'Bearer',
        redirect_uri: '/',
        client_id: 'sirix',
        token_key: 'access_token',
        state: 'UNIQUE_AND_NON_GUESSABLE'
      }
    }
  },
  router: {
    middleware: ['auth']
  },
  /* proxy: {
    '/user/authorize': {
      target: 'https://127.0.0.1:9443/user/authorize',
    }
  } */
}
