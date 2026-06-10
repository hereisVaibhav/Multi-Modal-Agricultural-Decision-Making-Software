import { useState } from 'react';
import './DiseaseAnalyzer.css';

const DiseaseAnalyzer = ({ onPredict, disabled }) => {
  const [plant, setPlant] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plant || !symptoms) return;
    
    onPredict({ plant, symptoms });
  };

  return (
    <div className="search-panel glass-panel">
      <h2>Symptom Analyzer</h2>
      <p className="subtitle">Describe your plant's symptoms for an AI diagnosis.</p>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="disease-plant">Plant Name</label>
          <input 
            type="text" 
            id="disease-plant" 
            value={plant}
            onChange={(e) => setPlant(e.target.value)}
            placeholder="e.g., Tomato, Rose, Lemon Tree"
            required
            disabled={disabled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="symptoms">Describe the Symptoms</label>
          <textarea 
            id="symptoms" 
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g., The leaves have white powdery spots, and the edges are curling brown."
            required
            disabled={disabled}
            rows="4"
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={disabled || !plant || !symptoms}
        >
          {disabled ? 'Analyzing...' : 'Diagnose Disease'}
        </button>
      </form>
    </div>
  );
};

export default DiseaseAnalyzer;
