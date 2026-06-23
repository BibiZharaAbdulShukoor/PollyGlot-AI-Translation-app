function Result({ original, translation, setShowResult }) {
  function startOver() {
    setShowResult(false);
  }

  return (
    <div className="phone">
      <div className="header">
        <img src="/logo.jpg" alt="Logo" />
        <div className="header-text"></div>
      </div>

      <h3>Original text 👇</h3>
      <div className="box">{original}</div>

      <h3>Your translation 👇</h3>
      <div className="box">{translation}</div>

      <button onClick={startOver}>Start Over</button>
    </div>
  );
}

export default Result;
