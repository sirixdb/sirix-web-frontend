import { Agent } from 'https';

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
  modules: ['@nuxtjs/pwa', ['@nuxtjs/axios',  { baseURL: 'localhost:3005', rejectUnauthorized: false }], '@nuxtjs/auth', '@nuxtjs/proxy', '@nuxtjs/toast'],
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
    baseURL: 'localhost:3005',
    browserBaseURL: 'localhost:3005',
    proxyHeaders: true,
    proxy: true,
    debug: true,
  },
  auth: {
    strategies: {
      keycloak: {
	_scheme: 'oauth2',
	authorization_endpoint: '/auth/user/authorize',
	userinfo_endpoint: false,
	access_type: 'offline',
	access_token_endpoint: '/auth/token',
	response_type: 'code',
	token_type: 'Bearer',
	token_key: 'access_token'
      },
    },
    redirect: {
      login: '/login',
      callback: '/callback',
      home: '/'
    },
  },
  router: {
    middleware: ['auth']
  },
  proxy: {
    '/auth/': {
      target: 'https://localhost:9443/',
      pathRewrite: {'^/auth': ''},
      agent: new Agent({ rejectUnauthorized: false }),
      changeOrigin: true
    },
    '/sirix/': {
      target: 'https://localhost:9443/',
      pathRewrite: {'^/sirix': ''},
      agent: new Agent({ rejectUnauthorized: false }),
      changeOrigin: true
    }
  }
}
