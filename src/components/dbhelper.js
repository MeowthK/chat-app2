import axios from 'axios'

const URL = "http://localhost:4000"

const register = async (/** @type {any} */ userData) => {
    return await axios.post(URL + '/api/register', userData)
}

const login = async (/** @type {any} */ userData) => {
    const t= await axios.get(URL + '/api/login', userData)
    console.log(t)
}

const dbhelper = { register, login }

export default dbhelper