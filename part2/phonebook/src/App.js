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

  const onNameFilterChange = ({ target: { value } }) => setNameFilter(value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={onNameFilterChange} />
      <h3>add a new</h3>
      <PersonForm persons={persons} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App
