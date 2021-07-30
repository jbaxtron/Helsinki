import axios from 'axios'
import React, { useState, useEffect } from 'react'
import person from './services/person.js'
import personService from './services/person.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const updater = () => {
    personService
      .getFullList()
      .then(response => {
        setPersons(response)
        console.log(persons)
      })
  }



  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const checker = persons.map(persons => persons.name)
    const checkerP = persons.map(persons => persons.number)
    const addition = { name: newName, number: newPhone }

    if (newName == '' || newPhone === '') {
      return;
    }

    else if (checker.includes(newName) && checkerP.includes(newPhone)) {
      window.alert(`${newName} is already added to the phonebook`)

      return;
    } else if (checker.includes(newName) && !checkerP.includes(newPhone)) {
      const personToUpd = persons.find(person => person.name === newName)
      console.log('Name: ', personToUpd.name)
      const newObject = { ...personToUpd, number: newPhone }
      console.log(`New Object: ${newObject}`)
      const pid = personToUpd.id

      if (window.confirm(`${newObject.name}, is already in the phone book, update number?`)){
        personService
        .updatePerson(pid, newObject)
        .then(returnedPerson =>
          setPersons(persons.map(person1 => person1.id !== personToUpd.id ? person1 : returnedPerson))
        )
        .catch(()=>{setMessage(`${newObject.name} has already been deleted from the PhoneBook`);
        setTimeout(() => {
          setMessage(null)
        },5000)})


        setMessage(`${newPhone} has been added to the PhoneBook`)
        setTimeout(() => {
          setMessage(null)
        },5000)
        setNewName('')
        setNewPhone('')
      }
    } else {

      setPersons(persons.concat([{ name: newName, number: newPhone }]))

      personService
        .addToList(addition)
        .then(returned => {
          setPersons(persons.concat(returned))
        })

        setMessage(`${newName} has been added to the PhoneBook`)
        setTimeout(() => {
          setMessage(null)
        },5000)
      setNewName('')
      setNewPhone('')
      
    }
  }

  const readInput = (event) => {
    setNewName(event.target.value)
  }

  const readPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const readFilter = (event) => {
    setNewFilter(event.target.value)


  }

  const delPerson = (event) => {
    const pid = event.target.value
    console.log("PID :", pid)
    console.log(`Persons: ${persons}`)


    //This line gave me grief --v If the "return" is INSIDE the .find function it works, calling it on "found" as a function outside the function DOES NOT work. 
    const found = persons.find(person1 => { return person1.id == pid });
    console.log(found)
    const pName = found.name;
    console.log(pName)




    if (window.confirm(`Are you sure you want to delete ${pName} ?`)) {

      const arrayMinus = persons.filter(x => x !== found)

      personService
        .deleteFromList(event)
        .then(setPersons(arrayMinus))

    }

  }

  useEffect(() => {
    updater()

  }, [JSON.stringify(personService.getFullList)])


  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message}/>
      <Filter readFilter={readFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} readInput={readInput} readPhone={readPhone} />
      <h2>Numbers</h2>
      <Directory delPerson={delPerson} persons={persons} newFilter={newFilter} />


    </div>
  )
}

const Filter = ({ readFilter }) => {
  return (
    <div>
      filter shown with <input onChange={readFilter} />
    </div>
  )
}

const PersonForm = ({ addName, readInput, readPhone }) => {

  return (
    <form onSubmit={addName}>
      <table>
        <tbody>
          <tr>
            <td>Name:</td><td><input onChange={readInput} /></td>
          </tr>
          <tr>
            <td>Number:</td><td><input onChange={readPhone} /></td>
          </tr>
          <tr>
            <td><button type="submit">add</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  )

}


const Directory = ({ delPerson, persons, newFilter }) => {

  const fp = persons.filter(person1 => person1.name.toLowerCase().includes(newFilter.toLowerCase()))

  if (!newFilter === '') {
    return (
      <div>

        {persons.map(person1 => <p key={person1.id}>{person1.name} {person1.number}
          <DelButton delPerson={delPerson} key={person1.id} personId={person1.id} /></p>
        )}
      </div>

    )
  }
  else {
    return (
      <div>
        {fp.map(person1 => <p key={person1.id}>{person1.name} {person1.number}
          <DelButton delPerson={delPerson} key={person1.id} personId={person1.id} /></p>
        )}
      </div>
    )
  }
}

const DelButton = ({ delPerson, personId }) => {


  return (
    <button value={personId} onClick={delPerson}>Delete</button>

  )
}

const Message = ({message}) =>{
if((message===null)){
  return null
}else {
  return(
    <div className='Message'>
      {message}
    </div>
  )
  }
}

export default App
