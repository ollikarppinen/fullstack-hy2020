import React from "react"

const Person = ({ person, removePerson }) => {
  const onRemovePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)) removePerson(person)
  }
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={onRemovePerson}>delete</button>
    </div>
  )
}

export default Person
