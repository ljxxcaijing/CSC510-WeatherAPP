import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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

  function rAct(a,b,c){
    if (a == "Clear" && c>30 ) return "The weather is good and it is suitable for various sports, but due to the high temperature, please avoid sunburn when exercising outdoors."
    else if (a == "Clear" && c>18) return "It is such a nice day. You can choose outdoor activities such as playing basketball."
    else if ((a == "Clear" || a =="Clouds") && b<10) return "The weather is suitable for outdoor sports, but please be careful of low temperatures."
    else if (a == "Clouds") return "It is not sunny but you can still go oustide and do sports. "
    else if (a == "Rain" || a == "Drizzle") return "It is rainning. Better do indoor activities such as watching a film"
    else return "The weather is bad. You should stay inside or choose indoor activities such as playing poker games."
  }
  
  function rDrink(a,b){
    
    
    var teas=["Bumble tea", "Fruit tea", "Milk Tea"];
      if(b>=28) return "The weather is hot. Let's get some cold drinks like ice cold coke."
      else if ( a <= 10) return "It is cold. Better warm yourself with a cup of hot chocolate."
      else if (b>25) return "The weather is a little hot. Why not having a cup of "+teas[1]+"?"
      else if (a<15) return "The weather is a little cold. Why not having a cup of "+teas[0]+"?"
      else return "The weather is fine. Why not having a cup of "+teas[2]+"?"
  }

  function rWater(temp, humidity, weather, windspeed){
    var s = ""
    if (windspeed > 10){
      s = s + "It's windy outside. Bring your plants back home! "
      
    }
    else{
      if (weather == "Drizzle" || weather == "Rain"){
        s = s + "It's raining outside. You can put your plants outside for watering. "
      }
      else if (humidity > 80){
        s = s + "It's gonna rain outside. You can put your plant outside for watering. "
      }
    }

    if (weather != "Drizzle" && weather != "Rain" && humidity < 80){
      if (temp > 30){
        s = s + "It's hot! Please give more water to your plants! "  
      }
      else if (temp < 5){
        s = s + "It's cold! Don't let your plants frost! "
      }
      else{
        s = s + "Please watering the plants as usual. "
      }
    }

    return s
  }
 
  function rClothes(temp, temp_min, temp_max, humidity, weather, windspeed){
    var Clothes = ["T-shirt", "Long-sleeved shirts", "windbreaker", "coat", "sweater", "sweatshirts", "jacket"]
    var Pants = ["shorts", "jeans", "pants", "joggers"]
    var s = ""
    const rain = "It's raining outside! Better to carry an umbrella or a raincoat with you. "
    const gonnaRain = "It's gonna raining outside! Better to carry an umbrella or a raincoat with you. "
    const snow = "It's snowing! Wear gloves and play outside! "
    const tempLow = "The weather is cold. Remember to wear a " + Clothes[3] + " and " + Clothes[4] + ". "
    const tempHigh = "The weather is hot. It's better to wear " + Clothes[0] + " and " + Pants[0] + ". "
    const tempMid = "The weather is moderate. You can pick clothes from " + Clothes[1] + ", " + Clothes[5] + ", " + Clothes[6] + ", and pick pants from " + Pants[1] + ", " + Pants[2] + ", " + Pants[3] + ". "
    const tempMax = "The weather gonna be hot. Remember to dress less inside. "
    const tempMin = "The weather gonna be cold. Remember to bring " + Clothes[3] + " or " + Clothes[6] + ". "
    
    if (weather == "Thunderstorm" || weather == "Drizzle" || weather == "Rain"){
      s = s + rain
    }
    else if (weather == "Snow"){
      s = s + snow
    }
    else if (humidity > 80){
      s = s + gonnaRain
    }
 
    if (temp < 10){
      s = s + tempLow
      if (temp_max > 25){
        s = s + tempMax
      }
    }
    else if (temp > 25){
      s = s + tempHigh
      if (tempMin < 10){
        s = s + tempMin
      }
    }
    else{
      s = s + tempMid 
      if (tempMin < 10){
        s = s + tempMin
      }
      else if (temp_max > 25){
        s = s + tempMax
      }
    }  
 
    if (windspeed > 10){
      s = s + "Wait! It's windy outside! Remember to bring a " + Clothes[2] + " with you! "
    }
 
    return s
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
          <div className="recommendation">
              <Tabs>
                <TabList>
                  <Tab>Suggested Drinks</Tab>
                  <Tab>Suggested Activities</Tab>
                  <Tab>Suggested Clothes</Tab>
                  <Tab>Plants Care Tips</Tab>
                </TabList>
                <TabPanel>
                  <h3>{rDrink(weather.main.temp_min,weather.main.temp_max)}</h3>
                </TabPanel>
                <TabPanel>
                  <h3>{rAct(weather.weather[0].main,weather.main.temp_min,weather.main.temp_max)}</h3>
                </TabPanel>
                <TabPanel>
                  <h3>{rClothes(weather.main.temp, weather.main.temp_min, weather.main.temp_max, weather.main.humidity, weather.weather[0].main, weather.wind.speed)}</h3>
                </TabPanel>
                <TabPanel>
                  <h3>{rWater(weather.main.temp, weather.main.temp_min, weather.main.temp_max, weather.main.humidity, weather.weather[0].main, weather.wind.speed)}</h3>
                </TabPanel>
              </Tabs>
          </div>
          <div className="future-box">
            <table className="forecast-table">
              <tbody>
                <tr>
                  <td>{forecast.list[0].dt_txt}</td>
                  <td>{forecast.list[0].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[0].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[0].main.temp}&deg;c</td>
                  <td>{forecast.list[0].main.humidity}%</td>
                </tr>
                <tr>
                  <td>{forecast.list[8].dt_txt}</td>
                  <td>{forecast.list[8].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[8].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[8].main.temp}&deg;c</td>
                  <td>{forecast.list[8].main.humidity}%</td>
                </tr>
                <tr>
                  <td>{forecast.list[16].dt_txt}</td>
                  <td>{forecast.list[16].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[16].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[16].main.temp}&deg;c</td>
                  <td>{forecast.list[16].main.humidity}%</td>
                </tr>
                <tr>
                  <td>{forecast.list[24].dt_txt}</td>
                  <td>{forecast.list[24].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[24].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[24].main.temp}&deg;c</td>
                  <td>{forecast.list[24].main.humidity}%</td>
                  </tr>
                <tr>
                  <td>{forecast.list[32].dt_txt}</td>
                  <td>{forecast.list[32].weather[0].main}</td>
                  <td> <img src = {"http://openweathermap.org/img/w/"+ forecast.list[32].weather[0].icon + ".png" }></img></td>
                  <td>{forecast.list[32].main.temp}&deg;c</td>
                  <td>{forecast.list[32].main.humidity}%</td>
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
