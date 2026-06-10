import { useState } from 'react';
import './YieldCalculator.css';

const YieldCalculator = ({ onPredict, disabled }) => {
  const [plant, setPlant] = useState('');
  const [farmSizeAcres, setFarmSizeAcres] = useState('');
  const [temperature, setTemperature] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plant || !farmSizeAcres) return;
    
    onPredict({ plant, farmSizeAcres: Number(farmSizeAcres), temperature: Number(temperature) });
  };

  return (
    <div className="search-panel glass-panel">
      <h2>Commercial Yield</h2>
      <p className="subtitle">Estimate your harvest timeline and potential profit.</p>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="yield-plant">Crop Type</label>
          <input 
            type="text" 
            id="yield-plant" 
            value={plant}
            onChange={(e) => setPlant(e.target.value)}
            placeholder="e.g., Wheat, Corn, Soybeans"
            required
            disabled={disabled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="farm-size">Farm Size (Acres)</label>
          <input 
            type="number" 
            id="farm-size" 
            value={farmSizeAcres}
            onChange={(e) => setFarmSizeAcres(e.target.value)}
            placeholder="e.g., 50"
            required
            disabled={disabled}
            min="0.1"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="yield-temp">Average Temp (°C)</label>
          <input 
            type="number" 
            id="yield-temp" 
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="e.g., 25"
            disabled={disabled}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={disabled || !plant || !farmSizeAcres}
        >
          {disabled ? 'Calculating...' : 'Calculate Yield'}
        </button>
      </form>
    </div>
  );
};

export default YieldCalculator;
