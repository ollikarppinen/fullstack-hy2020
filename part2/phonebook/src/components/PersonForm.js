import React, { useState } from "react"

const PersonForm = ({ persons, addPerson, updatePerson }) => {
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const onNewNameChange = ({ target: { value } }) => setNewName(value)
  const onNewNumberChange = ({ target: { value } }) => setNewNumber(value)
  const onSubmit = (event) => {
    event.preventDefault()
    const matchingPerson = persons.find(({ name }) => newName === name)
    if (matchingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson({
          ...matchingPerson,
          number: newNumber,
        }).then(() => {
          setNewName("")
          setNewNumber("")
        })
      }
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
