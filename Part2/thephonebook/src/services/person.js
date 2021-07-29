import axios from 'axios'
import react from 'react'


const url = 'http://localhost:3001/persons'

const getFullList = () => {
    const request = axios.get(`${url}`);
    return request.then(response => response.data)
      
}

const addToList = (addition) => {
    const request = axios.post(`${url}`, addition)
    return request.then(response =>response.data)
}

const deleteFromList = (event) => {

    const pid = event.target.value
    
    const request = axios.delete(`${url}/${pid}`)
    return request.then(getFullList())
}

const updatePerson = (pid, newObject) => {
    //const pid = event.target.value
    const request = axios.put(`${url}/${pid}`, newObject)
    return request.then(response => response.data)
}

export default { getFullList, addToList, deleteFromList, updatePerson }