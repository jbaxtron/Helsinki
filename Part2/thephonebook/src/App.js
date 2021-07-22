import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone:'999-999-9999'},
      { name: 'Ada Lovelace', phone: '39-44-5323523' },
      { name: 'Dan Abramov', phone: '12-43-234345' },
      { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    console.log('button clicked', event.target)
    const checker = persons.map(persons => persons.name)
    if(checker.includes(newName)){
      window.alert(`${newName} is already added to the phonebook`)
      
      return;
    }else{
    setPersons(persons.concat([{name : newName, phone: newPhone}]))
    setNewName('')
    setNewPhone('')
    }

  }

  const readInput = (event) =>{
    setNewName(event.target.value)
  }

  const readPhone = (event) =>{
    setNewPhone(event.target.value)
  }
  
  const readFilter = (event) => {
    setNewFilter(event.target.value)


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter readFilter={readFilter} />
      <h2>Add a new</h2>
      <PersonForm  addName={addName} readInput={readInput} readPhone={readPhone}/>
      <h2>Numbers</h2>
      <Directory persons={persons} newFilter={newFilter} />
      
      
    </div>
  )
}

const Filter = ({readFilter}) => {
  return(
  <div>
  filter shown with <input onChange={readFilter}/>
  </div>
  )
}

const PersonForm = ({addName, readInput, readPhone}) => {

  return (
    <form onSubmit={addName}>
      <table>
        <tr>
          <td>Name:</td> <td><input onChange={readInput}/></td>
        </tr>
        <tr>
          <td>Number:</td> <td><input onChange={readPhone}/></td>
        </tr>
        <div>
          <button type="submit">add</button>
        </div>
        </table>
      </form>
  )

}

const Directory = ({persons, newFilter}) => {
  console.log(newFilter)
  
  const fp = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  console.log(fp)
 
if(!newFilter===''){
  return (
    <div>
      {persons.map((person, i) => <p key={i}>{person.name} {person.phone}</p>)}
    </div>
  )
  }
  else {
    return (
      <div>
        {fp.map((person, i) => <p key={i}>{person.name} {person.phone}</p>)}
      </div>
    )
  }
}

export default App
