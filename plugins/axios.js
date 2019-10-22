import axios from 'axios'
import https from 'https'

var fs = require('fs');

// set baseURL
axios.defaults.baseURL = 'https://localhost:9443'

let options = {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    /* cert: fs.readFileSync("/home/johannes/sirix-web-frontend/plugins/cert.pem"),
    key: fs.readFileSync("/home/johannes/sirix-web-frontend/plugins/key.pem"), */
  }),
  baseURL: 'https://localhost:9443'
}

var sirixdb = axios.create(options)
var sirixdbLogger = require('debug')('sirixdb')
require('axios-debug-log').addLogger(sirixdb, sirixdbLogger)

axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})

// create axios object
export default sirixdb;
