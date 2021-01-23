import React, { useState, useEffect } from "react"

import personsService from "./services/persons"

import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then(setPersons)
  }, [])

  const handleError = (error) => {
    setErrorMessage(`Error: ${error}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addPerson = (person) =>
    personsService
      .create(person)
      .then((person) => {
        setPersons(persons.concat(person))
        setSuccessMessage(`${person.name} was successfully added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(handleError)

  const removePerson = ({ id, name }) =>
    personsService
      .remove(id)
      .then((id) => {
        setPersons(persons.filter((person) => person.id !== id))
        setSuccessMessage(`${name} was successfully removed`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(handleError)

  const updatePerson = ({ id, ...person }) =>
    personsService
      .update(id, person)
      .then((person) => {
        setPersons(persons.filter(({ id }) => person.id !== id).concat(person))
        setSuccessMessage(`${person.name} was successfully updated`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(handleError)

  const onNameFilterChange = ({ target: { value } }) => setNameFilter(value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="error" message={errorMessage} />
      <Notification className="success" message={successMessage} />
      <Filter value={nameFilter} onChange={onNameFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        persons={persons}
        addPerson={addPerson}
        updatePerson={updatePerson}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        removePerson={removePerson}
      />
    </div>
  )
}

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return <div className={className}>{message}</div>
}

export default App
