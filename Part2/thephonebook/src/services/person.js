import axios from 'axios'



const url = '/api/persons'

const getFullList = () => {
    const request = axios.get(`${url}`);
    return request.then(response => response.data)
      
}



const addToList = (addition) => {
    const request = axios.post(`${url}`, addition)
    return request.then(response => {return response})
    //.catch(error => {return(error)})
}



const deleteFromList = (event) => {

    const pid = event.target.value
    
    const request = axios.delete(`${url}/${pid}`)
    return request.then(res => res.status)
}

const updatePerson = (pid, newObject) => {
    //const pid = event.target.value
    const request = axios.put(`${url}/${pid}`, newObject)
    return request.then(response => response.data)
    .catch(error => {return(error.data)} )
}


export default { getFullList, addToList, deleteFromList, updatePerson }