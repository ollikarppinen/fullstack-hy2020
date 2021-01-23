import React from "react"

import Person from "./Person"

const Persons = ({ persons, nameFilter, ...props }) => {
  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(nameFilter.toLowerCase())
  )
  return (
    <>
      {filteredPersons.map((person) => (
        <Person key={person.name} {...props} {...person} />
      ))}
    </>
  )
}

export default Persons
