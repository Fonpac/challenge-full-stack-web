import axios from 'axios'

const studentApi = axios.create({
    withCredentials: false,
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default studentApi
