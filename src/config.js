import axios from 'axios'

const auth = JSON.parse(window.localStorage.getItem('lbUser'))

axios.defaults.baseURL = 'http://147.139.193.105/resik/v1/'
axios.defaults.headers.common['Authorization'] = auth.token