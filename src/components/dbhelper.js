import axios from 'axios'

const URL = "http://localhost:4000"

const register = async (/** @type {any} */ userData) => {
    return await axios.post(URL + '/api/register', userData)
}

const login = async (/** @type {any} */ userData) => {
    return (await axios.post(URL + '/api/login', userData)).data !== null
}

const getChats = async (userData) => {
    return await axios.post(URL + '/api/chats', userData)
}

const dbhelper = { register, login, getChats }

export default dbhelper