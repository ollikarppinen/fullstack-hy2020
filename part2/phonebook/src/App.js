import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "" }])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const onNameInputChange = ({ target: { value } }) => setNewName(value)
  const onNumberInputChange = ({ target: { value } }) => setNewNumber(value)
  const onSubmit = (event) => {
    event.preventDefault()
    if (persons.some(({ name }) => newName === name)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberInputChange} />
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

const Person = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
)

export default App
