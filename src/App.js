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

  function search() {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      setQuery('');
      console.log(result);
    }) 
      // fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
      //    .then(res => res.json())
      //    .then(result => {
      //      setForecast(result);
      //      setQuery('');
      //      console.log(result);
      //    })     
  }  

  function future() {
    fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
    .then(foreres => foreres.json())
    .then(foreresult => {
      setForecast(foreresult);
      setQuery('');
      console.log(foreresult);
    })  
  }  

  const handleClick = evt => {
    if(evt.key === "Enter") {
      // search();
      future();
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
            id="search"
            className="search-bar"
            placeholder="Input city"
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
          <a href="#" 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onClick={() => { search(); future();}}>Change
          </a>

        </div>
        {/* {(typeof weather.main !== "undefined" && forecast.list !== "undefined") ? ( */}
        {(typeof forecast.list != "undefined") ? (
        <div className="location-box">
          <div className="location">
            {/* {weather.name},{weather.sys.country} */}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">
              {/* {weather.main.temp}°c */}
            </div>
            <div className="minmax">
              {/* Lowest:{weather.main.temp_min}°c Highest:{weather.main.temp_max}°c */}
            </div>
            <div className="weather">
              {/* {weather.weather[0].main} */}
              {/* <img src="${api.icon} + weather.weather[0].icon + '.png'"></img> */}
            </div>
            <div className="humidity">
              humidity: {weather.main.humidity}%
            </div>
          </div>
          <div className="future-box">
            {/* {weather.coord.lon} */}
            <table className="forecast-table">
              <tbody>
                <tr>
                  <td>{forecast.list[0].dt_txt}</td>
                  <td>{forecast.list[0].weather[0].main}</td>
                  <td>{forecast.list[0].main.temp}&deg;c</td>
                </tr>
                <tr>
                  <td>{forecast.list[8].dt_txt}</td>
                  <td>{forecast.list[8].weather[0].main}</td>
                  <td>{forecast.list[8].main.temp}&deg;c</td>
                </tr>
                <tr>
                  <td>{forecast.list[16].dt_txt}</td>
                  <td>{forecast.list[16].weather[0].main}</td>
                  <td>{forecast.list[16].main.temp}&deg;c</td>
                </tr>
                <tr>
                  <td>{forecast.list[24].dt_txt}</td>
                  <td>{forecast.list[24].weather[0].main}</td>
                  <td>{forecast.list[24].main.temp}&deg;c</td>
                  </tr>
                  <tr>
                    <td>{forecast.list[32].dt_txt}</td>
                    <td>{forecast.list[32].weather[0].main}</td>
                    <td>{forecast.list[32].main.temp}°c</td>
                  </tr>
                </tbody>
              </table>
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
            <div className="minmax">
              Lowest:5°c Highest:15°c
            </div>
            <div className="weather">
              Sunny
            </div>
            <div className="humidity">
              60%
            </div>
          </div>
          <div className="future-box">
            {/* {forecast.cnt}  */}
            {/* {forecast[0].main.temp} */}
            Table 1 8 16 24 32 40
            dt_txt: weather, temp, humidity
          </div>
          
        
        </div>
        )}
      </main>
    </div>
  );
}

export default App;
