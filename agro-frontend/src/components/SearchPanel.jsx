import { useState } from 'react';
import './SearchPanel.css';

const SearchPanel = ({ onPredict, disabled }) => {
  const [plant, setPlant] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('60');
  const [soilType, setSoilType] = useState('Loam');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plant || !temperature) return;
    
    onPredict({ plant, temperature, humidity, soilType });
  };

  return (
    <div className="search-panel glass-panel">
      <h2>Environmental Params</h2>
      <p className="subtitle">Enter the current conditions to generate an AI care plan.</p>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="plant">Plant Name / Species</label>
          <input 
            type="text" 
            id="plant" 
            value={plant}
            onChange={(e) => setPlant(e.target.value)}
            placeholder="e.g., Tomato, Aloe Vera, Orchid"
            required
            disabled={disabled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="temperature">Current Temp (°C)</label>
          <input 
            type="number" 
            id="temperature" 
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="e.g., 28"
            required
            disabled={disabled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="humidity">Humidity (%)</label>
          <input 
            type="number" 
            id="humidity" 
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            placeholder="e.g., 60"
            disabled={disabled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="soilType">Soil Type</label>
          <select 
            id="soilType" 
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            disabled={disabled}
          >
            <option value="Loam">Loam</option>
            <option value="Clay">Clay</option>
            <option value="Sandy">Sandy</option>
            <option value="Peat">Peat</option>
            <option value="Chalk">Chalk</option>
            <option value="Hydroponic">Hydroponic</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={disabled || !plant || !temperature}
        >
          {disabled ? 'Analyzing...' : 'Generate Prediction'}
        </button>
      </form>
    </div>
  );
};

export default SearchPanel;
