import { useState, useEffect } from 'react';
import './App.css';
import icon from './image/icon.png'

function App() {

  const [input, setInput] = useState('');
  const [city, setCity] = useState(null);

//USED OPENWEATHER API TO GET THE TEMPERATURE OF CTIES
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.REACT_APP_SECRET_KEY}`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
      // console.log(resJson);
    };


    fetchApi();
  }, [input])


  return (
    <>
      <div className="card">
        <div className="search">
          <input placeholder="Search the location..."
            type="search"
            className="input"
            onChange={e => setInput(e.target.value)} />
        </div>

        {!city ? (
            <p>City Not Found</p>
          ) : (
            <div>
              <div className="content">
                <div className="img">
                  <img src={icon} alt="icon" />
                </div>
                <h2 className='city' >{input}</h2>
              </div>

              <div className="temp-content">
                <h1 className='temp'>{(city.temp - 273.15).toFixed(1) }<span>&#8451;</span></h1>
                <p className='temp-info'>Min: {(city.temp_min - 273.15).toFixed(1)}<span>&#8451;</span> | Max: {(city.temp_max - 273.15).toFixed(1)}<span>&#8451;</span></p>
              </div>
            </div>
          )}
      </div>

    </>
  )
}

export default App;
