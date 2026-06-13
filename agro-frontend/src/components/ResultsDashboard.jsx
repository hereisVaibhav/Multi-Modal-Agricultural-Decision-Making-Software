import './ResultsDashboard.css';

const ResultsDashboard = ({ data }) => {
  if (!data) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Optimal': return 'status-optimal';
      case 'Stress': return 'status-stress';
      case 'Critical': return 'status-critical';
      default: return 'status-optimal';
    }
  };

  return (
    <div className="results-dashboard animate-fade-in">
      <div className="dashboard-header glass-panel">
        <div className="header-info">
          <h2>{data.plant || 'Plant Care Result'}</h2>
          <span className="growth-stage">{data.growthStage || 'N/A'}</span>
        </div>
        <div className={`status-badge ${getStatusColor(data.status)}`}>
          {data.status || 'Optimal'}: {data.statusMessage || 'No status message available'}
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card glass-panel water-card">
          <div className="card-icon">💧</div>
          <h3>Water Requirement</h3>
          <div className="metric-value">
            {data.waterRequirement?.value ?? 'N/A'} <span>{data.waterRequirement?.unit ?? 'L/day'}</span>
          </div>
          <p className="metric-note">{data.waterRequirement?.adjustment || 'No specific adjustment'}</p>
        </div>

        <div className="metric-card glass-panel env-card">
          <div className="card-icon">🌡️</div>
          <h3>Environment</h3>
          <div className="env-stats">
            <div className="stat">
              <span className="label">Optimal Temp</span>
              <span className="value">
                {data.temperature?.optimalMin ?? 'N/A'} - {data.temperature?.optimalMax ?? 'N/A'}{data.temperature?.unit ?? '°C'}
              </span>
            </div>
            <div className="stat">
              <span className="label">Optimal Humid</span>
              <span className="value">
                {data.humidity?.optimalMin ?? 'N/A'} - {data.humidity?.optimalMax ?? 'N/A'}{data.humidity?.unit ?? '%'}
              </span>
            </div>
            <div className="stat">
              <span className="label">Target pH</span>
              <span className="value">
                {data.pH?.min ?? 'N/A'} - {data.pH?.max ?? 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="metric-card glass-panel nutrition-card">
          <div className="card-icon">🌱</div>
          <h3>N-P-K Nutrition</h3>
          <div className="npk-stats">
            <div className="npk-item">
              <span className="element">N</span>
              <span className="value">{data.nutrition?.nitrogen?.value ?? 'N/A'}</span>
            </div>
            <div className="npk-item">
              <span className="element">P</span>
              <span className="value">{data.nutrition?.phosphorus?.value ?? 'N/A'}</span>
            </div>
            <div className="npk-item">
              <span className="element">K</span>
              <span className="value">{data.nutrition?.potassium?.value ?? 'N/A'}</span>
            </div>
            <div className="npk-item">
              <span className="element">Ca</span>
              <span className="value">{data.nutrition?.calcium?.value ?? 'N/A'}</span>
            </div>
          </div>
          <p className="metric-note text-center">Measured in g/day</p>
        </div>
      </div>

      <div className="advice-section glass-panel">
        <div className="advice-grid">
          {data.alerts && data.alerts.length > 0 && (
            <div className="advice-block alerts">
              <h3>⚠️ Critical Alerts</h3>
              <ul>
                {data.alerts.map((alert, idx) => (
                  <li key={idx}>{alert}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="advice-block tips">
            <h3>💡 AI Care Tips</h3>
            <ul>
              {(data.tips || []).map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {data.funFact && (
          <div className="fun-fact">
            <strong>Did you know?</strong> {data.funFact}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;
