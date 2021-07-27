
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')


  const searching = (event) => {
    setSearch(event.target.value)


  }

  const updateSearch = (props) => {
    setSearch(props)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))

  }, [])



  // useEffect(() => {
  //   axios
  //     .get(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apikey}`)
  //     .then(response => setWeather(response.data))
  //   console.log(weather)

  // }, [])

  const back = (event) => {
    setSearch('')
  }


  return (
    <div>
      <p>Find Countries <input onChange={searching} /></p>
      <div>
        <Results countries={countries} search={search} updateSearch={updateSearch} />
      </div>
      <button onClick={back}>back</button>
    </div>
  )
}



const Results = ({ countries, search, updateSearch }) => {
  const filtered = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

  if (filtered.length > 10) {

    return (
      <div>
        {countries.map(country => <p key={country.numericCode}>{country.name}
          <Button cName={country.name} updateSearch={updateSearch} />
        </p>)}
      </div>
    )
  }

  if (filtered.length === 1) {

    return (
      <Expanded filtered={filtered} />
    )
  }

  if (filtered.length <= 10 && filtered.length > 1) {

    return (
      <div>
        {filtered.map(country => <p key={country.numericCode}>{country.name}
          <Button cName={country.name} updateSearch={updateSearch} />
        </p>)}
      </div>
    )
  }

  else {
    return <div><p>Too many results, please be more specific</p></div>
  }
}




const Languages = ({ filtered }) => {


  return (
    <ul>

      {filtered.map(entry => entry.languages.map((language) => <li key={language}>{language.name}</li>)
      )}
    </ul>
  )

}




const Image = ({ filtered }) => {

  return (
    <div>
      {filtered.map(entry => <img src={entry.flag} alt='' key={entry.flag} />)}
    </div>
  )
}



const Expanded = ({ filtered }) => {

  return (
    <div>
      {
        filtered.map(country =>


          <div key={country.numericCode}>
            <h1>
              {country.name}
            </h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>
              Languages
            </h2>
            <Languages filtered={filtered} />
            <Image filtered={filtered} />
            <h2>Weather in {country.capital}</h2>
            <Weather capital={country.capital} />

          </div>



        )
      }
    </div>
  )
}

const Button = ({ cName, updateSearch }) => {

  const handleClick = (event) => {
    updateSearch(cName)
  }


  return (
    <button onClick={handleClick}>show</button>
  )

}

const Weather = ({ capital }) => {
  const apikey = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})
  const [wind, setWind] = useState({})




  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apikey}`)
      .then(response => {
        setWeather(response.data.main)
        setWind(response.data.wind)
      }
      )

    console.log(weather)
  }, [])

  return (
    <div>
      <h3>Temperature</h3>
      <p>{weather.temp} Celsius</p>
      <h3>Wind: </h3>
      <p>{wind.speed} Kph</p>

    </div>
  )
}

export default App;
