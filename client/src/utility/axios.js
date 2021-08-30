import axios from 'axios';
import config from '../config/index'

axios.defaults.baseURL = config.baseUrl

export default axios