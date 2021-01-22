import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ])
  const [nameFilter, setNameFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const onNameFilterChange = ({ target: { value } }) => setNameFilter(value)
  const onNewNameChange = ({ target: { value } }) => setNewName(value)
  const onNewNumberChange = ({ target: { value } }) => setNewNumber(value)
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

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <div>
          filter shown with{" "}
          <input value={nameFilter} onChange={onNameFilterChange} />
        </div>
      </div>
      <div>
        <h2>add a new</h2>
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
      </div>
      <div>
        <h2>Numbers</h2>
        {filteredPersons.map(Person)}
      </div>
    </div>
  )
}

const Person = ({ name, number }) => (
  <div key={name}>
    {name} {number}
  </div>
)

export default App
