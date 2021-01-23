import React from "react"

import Person from "./Person"

const Persons = ({ persons, nameFilter, removePerson }) => {
  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(nameFilter.toLowerCase())
  )
  return (
    <>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person} removePerson={removePerson} />
      ))}
    </>
  )
}

export default Persons
