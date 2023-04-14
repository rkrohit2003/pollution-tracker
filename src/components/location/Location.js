import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Location.css";

export const Location = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const cityName = event.target.elements.city.value;
    const stateName = event.target.elements.state.value;
    const countryName = event.target.elements.country.value;
    const locationResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryName}&limit=5&appid=18f41b92768e1f4006d4661cdd7c1c6e`);
    const [locationData] = await locationResponse.json();
    if (locationData) {
      navigate('/pollution', { state: locationData });
    } else {
      alert("Invalid Location");
    }
  }

  return (
    <div className="container mt-3 minH">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" autoComplete='off'/>
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input type="text" className="form-control" id="country" autoComplete='off'/>
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input type="text" className="form-control" id="state" autoComplete='off'/>
        </div>
        <button type="submit" className="btn btn-primary">Get Pollution Details</button>
      </form>
    </div>
  )
}
