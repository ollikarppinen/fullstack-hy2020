import React, { useState, useEffect } from "react"
import axios from "axios"

import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("persons", persons)
      setPersons(response.data)
    })
  }, [])

  const addPerson = (person) =>
    axios.post("http://localhost:3001/persons", person).then((response) => {
      setPersons([...persons, response.data])
    })

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
