import axios from 'axios';
import { GetEnvVariables } from '../src/helpers/GetEnvVariables';

const { VITE_API_URL } = GetEnvVariables();

const calendarApi = axios.create({
    // baseURL: import.meta.env.VITE_API_URL
    baseURL: VITE_API_URL
});

// TODO: COnfirgurar interceptores
// calendarApi.interceptors.request.use( config => {
//     config.headers ={
//         ...config.headers,
//         'x-token': localStorage.getItem('token')
//     }
//     return config;
// })

export default calendarApi;