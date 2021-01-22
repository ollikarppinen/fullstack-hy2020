import React from "react"

import Person from "./Person"

const Persons = ({ persons, nameFilter }) => {
  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(nameFilter.toLowerCase())
  )
  return <>{filteredPersons.map(Person)}</>
}

export default Persons
