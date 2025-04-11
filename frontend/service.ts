import axios, { AxiosInstance } from "axios";
import 'dotenv/config'
import store from "./store";

const { dispatch, getState, subscribe } = store

interface User {
    token?: string;
}

let user: User | null = getState().HELReducer.user || getState().HELReducer.seller || getState().HELReducer.adminUser
subscribe(() => {
    user = getState().HELReducer.user || getState().HELReducer.seller || getState().HELReducer.adminUser
})

const service: AxiosInstance = axios.create({
    baseURL: 'http://10.1.14.101/hel/api'
})


const openPaths = [
    '/auth/register/send-mobile-otp',
    '/auth/register/verify-otp',
    '/auth/register/send-email-otp',
    '/auth/register/verify-email-otp',
    '/auth/register',
    '/auth/login/username',
    '/auth/verify-login-otp',
    '/auth/register/mstc-admin',
    '/auth/register/brand',
]

service.interceptors.request.use(request => {
    if (!openPaths.includes(request.url as string)) {
        if (user) request.headers.Authorization = user?.token
        // request.headers = {
        //     ...request.headers,
        //     Authorization: `Bearer ${user?.access}`
        // }
    }
    // if (request.url == '/sendForgotEmail') delete request.headers.Authorization
    // if (request.url == '/resetpassword') delete request.headers.Authorization
    return request
})

export default service