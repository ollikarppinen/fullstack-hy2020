import React, { useState } from "react"

const PersonForm = ({ persons, addPerson }) => {
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const onNewNameChange = ({ target: { value } }) => setNewName(value)
  const onNewNumberChange = ({ target: { value } }) => setNewNumber(value)
  const onSubmit = (event) => {
    event.preventDefault()
    if (persons.some(({ name }) => newName === name)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    addPerson({ name: newName, number: newNumber }).then(() => {
      setNewName("")
      setNewNumber("")
    })
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNewNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNewNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
