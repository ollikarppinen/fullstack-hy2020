import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const onInputChange = ({ target: { value } }) => setNewName(value)
  const onSubmit = (event) => {
    setPersons([...persons, { name: newName }])
    setNewName("")
    event.preventDefault()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(Person)}
    </div>
  )
}

const Person = ({ name }) => <div>{name}</div>

export default App
