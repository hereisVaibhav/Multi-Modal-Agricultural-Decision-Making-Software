const DiagnosisDashboard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="disease-dashboard animate-fade-in">
      <div className="dashboard-header glass-panel">
        <div className="header-info">
          <h2>{data.plant} Analysis</h2>
          <span className="growth-stage">Confidence: {data.confidenceScore}</span>
        </div>
        <div className={`status-badge severity-${data.severity}`}>
          Severity: {data.severity}
        </div>
      </div>

      <div className="diagnosis-main glass-panel">
        <h3>{data.diseaseName}</h3>
        <p className="cause">{data.cause}</p>
      </div>

      {data.treatment.immediateAction && (
        <div className="immediate-action">
          <h4>🚨 Immediate Action Required</h4>
          <p>{data.treatment.immediateAction}</p>
        </div>
      )}

      <div className="treatment-grid">
        <div className="treatment-card organic glass-panel">
          <h4>Organic Treatment</h4>
          <ul>
            {data.treatment.organic.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="treatment-card chemical glass-panel">
          <h4>Chemical Treatment</h4>
          <ul>
            {data.treatment.chemical.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="advice-section glass-panel" style={{marginTop: '0'}}>
        <div className="advice-block tips" style={{width: '100%'}}>
          <h3>🛡️ Future Prevention</h3>
          <ul>
            {data.prevention.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisDashboard;
