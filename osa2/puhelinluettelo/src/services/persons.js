import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = updatedPerson => {
    const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    return request.then(response => response.data)
}

export default {getAll, add, remove, update}