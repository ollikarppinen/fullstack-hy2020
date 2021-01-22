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

  console.log("API KEY", process.env.REACT_APP_WEATHERSTACK_API_KEY)
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

const Country = ({ name, capital, population, languages = [], flag }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${name}`
      )
      .then((response) => {
        setWeather(response.data)
        console.log("weather", response.data)
      })
  }, [])
  return (
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

      {weather ? <Weather {...weather} /> : null}
    </div>
  )
}

const Weather = ({
  location: { name },
  current: { temperature, weather_icons, wind_speed, wind_dir },
}) => (
  <>
    <h3>Weather in {name}</h3>
    <div>
      <strong>temperature: {temperature} Celcius</strong>
      <div>
        <img src={weather_icons[0]} width="100" />
      </div>
      <strong>wind:</strong> {wind_speed} mph direction {wind_dir}
      {}
    </div>
  </>
)

export default App
