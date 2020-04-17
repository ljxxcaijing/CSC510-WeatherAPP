import React, { useState } from 'react';
const api = {
  key: "332dd44ef28eaf0c70a35fdac6e4194f",
  base: "https://api.openweathermap.org/data/2.5/",
  icon: "https://openweathermap.org/img/w/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});

  window.onload = function(){  
    search("Raleigh");
    future("Raleigh");
  }; 

  function search(a) {
    fetch(`${api.base}weather?q=${a}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      setQuery('');
      console.log(result);
    })   
  }  

  function future(a) {
    fetch(`${api.base}forecast?q=${a}&units=metric&APPID=${api.key}`)
    .then(foreres => foreres.json())
    .then(foreresult => {
      setForecast(foreresult);
      setQuery('');
      console.log(foreresult);
    })  
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
            id="search"
            className="search-bar"
            placeholder="Input city"
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
          <button 
            className="change-button"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onClick={() => { search(query); future(query);}}
            >
            Change city
          </button>
        </div>
        {/* {(typeof weather.main !== "undefined" || forecast.list !== "undefined") ? ( */}
        {(typeof forecast.list !== "undefined") ? (
        <div className="location-box">
          <div className="location">
            {weather.name},{weather.sys.country}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="weather">
              {weather.weather[0].main} 
              <img 
                className="icon-image"
                src = {"http://openweathermap.org/img/w/"+ weather.weather[0].icon + ".png" }>
              </img>
            </div>
            <div className="temp">
              {weather.main.temp}°c
            </div>
            <div className="minmax">
              {weather.main.temp_min}°c ~ {weather.main.temp_max}°c
            </div>
            <div className="humidity">
              humidity: {weather.main.humidity}% wind: {weather.wind.speed}m/s
            </div>
          </div>
          <div className="future-box">
            <table className="forecast-table">
              <tbody>
                <tr>
                  <td>{forecast.list[0].dt_txt}</td>
                  <td>{forecast.list[0].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[0].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[0].main.temp}&deg;c</td>
                </tr>
                <tr>
                  <td>{forecast.list[8].dt_txt}</td>
                  <td>{forecast.list[8].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[8].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[8].main.temp}&deg;c</td>
                </tr>
                <tr>
                  <td>{forecast.list[16].dt_txt}</td>
                  <td>{forecast.list[16].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[16].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[16].main.temp}&deg;c</td>
                </tr>
                <tr>
                  <td>{forecast.list[24].dt_txt}</td>
                  <td>{forecast.list[24].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[24].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[24].main.temp}&deg;c</td>
                  </tr>
                <tr>
                  <td>{forecast.list[32].dt_txt}</td>
                  <td>{forecast.list[32].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[32].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[32].main.temp}&deg;c</td>
                </tr>
                </tbody>
              </table>
          </div>
        </div>
        ) : (
          <div className="error-message">
             City not found!
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
