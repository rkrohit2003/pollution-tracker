import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import "./Pollution.css"
import Chart from "react-apexcharts"

export const Pollution = () => {
    const [pollution, setPollution] = useState();
    const [aqi, setAqi] = useState();
    const loc=useLocation().state;
    const latitude=loc.lat;
    const longitude=loc.lon;
    const cityName=loc.name;
    const fetchData=async()=>{
            const pollutionResponse=await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=18f41b92768e1f4006d4661cdd7c1c6e`);
            const pollutionData=await pollutionResponse.json();
            setPollution(pollutionData);
            setAqi(pollutionData.list[0].main.aqi);
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (  
    <div className="container minH">
        {pollution && (
            <div>
          <h1>Pollutants Details</h1>
          <div className="over">
            <table  className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Pollutants</th>
                <th>Concentration(μg/m3)</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CO (Carbon monoxide)</td>
                    <td>{pollution.list[0].components.co}</td>
                </tr>
                <tr>
                    <td>NO<sub>2</sub> (Nitrogen dioxide)</td>
                    <td>{pollution.list[0].components.no2}</td>
                </tr>
                <tr>
                    <td>SO<sub>2</sub> (Sulphur dioxide)</td>
                    <td>{pollution.list[0].components.so2}</td>
                </tr>
                <tr>
                    <td>O<sub>3</sub> (Ozone)</td>
                    <td>{pollution.list[0].components.o3}</td>
                </tr>
                <tr>
                    <td>PM<sub>2.5</sub> (Fine particles matter)</td>
                    <td>{pollution.list[0].components.pm2_5}</td>
                </tr>
                <tr>
                    <td>PM<sub>10</sub> (Coarse particulate matter)</td>
                    <td>{pollution.list[0].components.pm10}</td>
                </tr>
            </tbody>
          </table>
          </div>
          <div>
            <Chart type='pie' height={600} series={[pollution.list[0].components.co,pollution.list[0].components.no2,pollution.list[0].components.so2,pollution.list[0].components.o3,pollution.list[0].components.pm2_5,pollution.list[0].components.pm10]}
            options={{labels:["CO","NO<sub>2</sub>","SO<sub>2</sub>","O<sub>3</sub>","PM<sub>2.5</sub>","PM<sub>10</sub>"]}}
            >
            </Chart>
          </div>
          <div className='aq'>
            {aqi===1 && (
                <p id='aqgood'>AQI of {cityName} is Good.</p>
            )}
            {aqi===2 && (
                <p id='aqfair'>AQI of {cityName} is Fair.</p>
            )}
            {aqi===3 && (
                <p id='aqmod'>AQI of {cityName} is Moderate.</p>
            )}
            {aqi===4 && (
                <p id='aqpoor'>AQI of {cityName} is Poor.</p>
            )}
            {aqi===5 && (
                <p id='aqvpoor'>AQI of {cityName} is Very Poor.</p>
            )}
          </div>
          </div>)}
    </div>
  )
}
