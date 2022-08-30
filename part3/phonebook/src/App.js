import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(()=> {
    personService
      .getAll()
      .then(allPersons => setPersons(allPersons))
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObJect = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      const existingPerson = persons.find((person) => person.name === newName)

      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, personObJect)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
            setNotificationMessage(`${existingPerson.name} phone number has been updated`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(() => {
            setNotificationMessage(
              `${existingPerson.name} was already removed from server`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }

      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(personObJect)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`${personObJect.name} has been added to the phonebook`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value);
  }

  const deletePerson = (event) => {
    const id = event.target.id

    if (window.confirm(`Are you sure you want to delete this person?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          console.log(persons)
          setNotificationMessage(`Person has been removed from phonebook`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(() => {
          setNotificationMessage(`Person was already removed from server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter value={searchFilter} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNewNumber} /> 
      <h2>Numbers</h2>
      <Persons persons={persons} searchFilter={searchFilter} onClick={(deletePerson)} />
    </div>
  )
}

export default App