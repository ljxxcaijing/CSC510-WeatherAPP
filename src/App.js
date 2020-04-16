import React, { useState } from 'react';
const api = {
  key: "332dd44ef28eaf0c70a35fdac6e4194f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
         .then(res => res.json())
         .then(result => {
           setWeather(result);
           setQuery('');
           console.log(result);
         })
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(fore => {
          setForecast(fore);
          setQuery('');
          console.log(fore);
        })     
    }
  }  

  const dateBuilder = (d) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${month} ${date}, ${year} (${day})`
  }
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search city"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className="location-box">
          <div className="location">
            {weather.name},{weather.sys.country}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">
              {weather.main.temp}°c
            </div>
            <div className="minmax">
              Lowest:{weather.main.temp_min}°c Highest:{weather.main.temp_max}°c
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
            <div className="humidity">
              humidity: {weather.main.humidity}%
            </div>
            <div className="forecast">
              Table 1 8 16 24 32 40
              dt_txt: weather, temp, humidity
            </div>
          </div>
        </div>
        ) : (
          <div className="location-box">
          <div className="location"> Raleigh, US
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">
              15°c
            </div>
            <div className="weather">
              Sunny
            </div>
            <div className="humidity">
              60%
            </div>
            <div className="forecast">
              <table className="Table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>January</td>
                  <td>$100</td>
                </tr>
                <tr>
                  <td>February</td>
                  <td>$80</td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>
        )}
      </main>
    </div>
  );
}

export default App;
