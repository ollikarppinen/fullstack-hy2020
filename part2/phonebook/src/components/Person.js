import React from "react"

const Person = ({ name, number }) => (
  <div key={name}>
    {name} {number}
  </div>
)

export default Person
