import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (!persons.map(person => person.name).includes(newName)) {
      personService
        .add(nameObject)
        .then(returned => {
          setPersons(persons.concat(returned))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`${newName} was added to the phonebook`)

          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber }

        personService
          .update(updatedPerson)
          .then(returned => {
            setPersons(persons.map(person => person.name !== newName ? person : returned))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`${person.name} 's number has been changed`)

            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${person.name} has already been removed from the server`)

            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(returned => {
          setErrorMessage(`${person.name} was deleted`)
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm onSubmit={addName} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person
          key={person.id}
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      )}
    </div>
  )

}

export default App