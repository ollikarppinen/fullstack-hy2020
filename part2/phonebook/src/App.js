import React, { useState, useEffect } from "react"

import personsService from "./services/persons"

import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState("")

  useEffect(() => {
    personsService.getAll().then(setPersons)
  }, [])

  const addPerson = (person) =>
    personsService
      .create(person)
      .then((person) => setPersons(persons.concat(person)))

  const removePerson = (id) =>
    personsService
      .remove(id)
      .then((id) => setPersons(persons.filter((person) => person.id !== id)))

  const updatePerson = ({ id, ...person }) =>
    personsService
      .update(id, person)
      .then((person) =>
        setPersons(persons.filter(({ id }) => person.id !== id).concat(person))
      )

  const onNameFilterChange = ({ target: { value } }) => setNameFilter(value)

  return (
    <div>
      <h2>Phonebook</h2>
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

export default App
