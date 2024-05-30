import axios from 'axios';
// import { GetEnvVariables } from '../src/helpers/GetEnvVariables';
import { baseUrl } from '../src/Urls';

// const { VITE_API_URL } = GetEnvVariables();

const calendarApi = axios.create({
    // baseURL: import.meta.env.VITE_API_URL
    baseURL: baseUrl
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