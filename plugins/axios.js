import axios from 'axios'

// set baseURL
axios.defaults.baseURL = 'http://localhost:3002'

// create axios object
export default axios.create()