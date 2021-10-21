import React, { useState } from 'react';
import './App.css';
import './Main.css';
const api = {
  key: 'fc9898af5ee32d5931c941801d7d7da8',
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (currentDate) => {
    // Months and Days array
    let monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get data from dates
    let day = daysArray[currentDate.getDay()];
    let today = currentDate.getDate();
    let month = monthsArray[currentDate.getMonth()];
    let year = currentDate.getFullYear();



    // Return date in format of 'Thursday 21 October 2021'
    return `${day} ${today} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Search City Here..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="location-box">
              <div className="location">Search any Location..</div>
            </div>
          </div>)}
      </main>
    </div>
  );
}

export default App;
