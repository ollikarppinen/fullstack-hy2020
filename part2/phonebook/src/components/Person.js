import React from "react"

const Person = ({ name, number, id, removePerson }) => {
  const onRemovePerson = () => {
    if (window.confirm(`Delete ${name}?`)) removePerson(id)
  }
  return (
    <div>
      {name} {number} <button onClick={onRemovePerson}>delete</button>
    </div>
  )
}

export default Person
