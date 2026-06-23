import { useState } from "react";
import Home from "./components/Home";
import Result from "./components/Result";

function App() {
  const [original, setOriginal] = useState("");
  const [translation, setTranslation] = useState("");
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="app">
      {!showResult ? (
        <Home
          setOriginal={setOriginal}
          setTranslation={setTranslation}
          setShowResult={setShowResult}
        />
      ) : (
        <Result
          original={original}
          translation={translation}
          setShowResult={setShowResult}
        />
      )}
    </div>
  );
}

export default App;
