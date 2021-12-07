import axios from 'axios'

axios.defaults.baseURL = 'http://147.139.193.105/resik/v1/'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')