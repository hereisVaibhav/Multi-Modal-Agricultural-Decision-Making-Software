import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen glass-panel">
      <div className="loader">
        <div className="leaf leaf-1">🍃</div>
        <div className="leaf leaf-2">🍃</div>
        <div className="leaf leaf-3">🍃</div>
      </div>
      <h3>Analyzing Plant Needs...</h3>
      <p>Our AI is crunching the environmental data to generate an optimal care plan.</p>
    </div>
  );
};

export default LoadingScreen;
