import axios, { AxiosInstance } from "axios";
import 'dotenv/config'

const service: AxiosInstance = axios.create({
    baseURL: 'http://10.1.14.101/api'
})

export default service