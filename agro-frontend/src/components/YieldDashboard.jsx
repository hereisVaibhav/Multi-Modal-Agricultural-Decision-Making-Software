const YieldDashboard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="yield-dashboard animate-fade-in">
      <div className="dashboard-header glass-panel">
        <div className="header-info">
          <h2>{data.plant || 'Crop Yield Prediction'}</h2>
          <span className="growth-stage">{data.farmSizeAcres ?? 'N/A'} Acres</span>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card glass-panel water-card">
          <div className="card-icon">🚜</div>
          <h3>Estimated Yield</h3>
          <div className="metric-value">
            {data.yield?.estimatedTons ?? 'N/A'} <span>{data.yield?.unit ?? 'Tons'}</span>
          </div>
          <p className="metric-note">{data.yield?.note || 'No additional notes'}</p>
        </div>

        <div className="metric-card glass-panel env-card">
          <div className="card-icon">⏳</div>
          <h3>Harvest Timeline</h3>
          <div className="metric-value">
            {data.timeline?.daysToHarvest ?? 'N/A'} <span>Days</span>
          </div>
          <div className="stages-list">
            {(data.timeline?.stages || []).map((stage, idx) => (
              <span key={idx} className="stage-badge">{stage}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="financials-card glass-panel">
        <h3>💰 Financial Projections</h3>
        <div className="financials-grid">
          <div className="fin-stat">
            <span className="label">Est. Market Value</span>
            <span className="value">{data.financials?.marketValueEstimate || 'N/A'}</span>
          </div>
          <div className="fin-stat">
            <span className="label">Est. Fertilizer Cost</span>
            <span className="value" style={{color: '#f87171'}}>{data.financials?.fertilizerCostEstimate || 'N/A'}</span>
          </div>
          <div className="fin-stat">
            <span className="label">Profit Margin</span>
            <span className="value">{data.financials?.profitMargin || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="advice-section glass-panel">
        <div className="advice-block tips" style={{width: '100%'}}>
          <h3>💡 Agricultural Recommendations</h3>
          <ul>
            {(data.recommendations || []).map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default YieldDashboard;
