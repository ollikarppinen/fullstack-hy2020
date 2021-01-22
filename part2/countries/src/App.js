import React, { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryNameFilter, setCountryNameFilter] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data)
      console.log("countries", response.data)
    })
  }, [])

  const filteredCountries = countries.filter(({ name }) =>
    name.toLowerCase().includes(countryNameFilter.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries{" "}
        <input
          value={countryNameFilter}
          onChange={({ target: { value } }) => setCountryNameFilter(value)}
        />
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          "Too many matches, specify another filter"
        ) : filteredCountries.length > 1 ? (
          filteredCountries.map(({ name }) => (
            <div key={name}>
              {name}
              <button onClick={() => setCountryNameFilter(name)}>show</button>
            </div>
          ))
        ) : filteredCountries.length > 0 ? (
          <Country {...filteredCountries[0]} />
        ) : (
          "No match"
        )}
      </div>
    </div>
  )
}

const Countries = ({ countries, setCountryNameFilter }) =>
  countries.map((country) => (
    <div key={country.name}>
      {country.name}
      <button onClick={() => setCountryNameFilter(country)}>show</button>
    </div>
  ))

const Country = ({ name, capital, population, languages = [], flag }) => (
  <div>
    <h2>{name}</h2>
    <p>capital {capital}</p>
    <p>population {population}</p>
    <h3>Languages</h3>
    <ul>
      {languages.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
    <img src={flag} width="100" />
  </div>
)

export default App
