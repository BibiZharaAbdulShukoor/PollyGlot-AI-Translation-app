import { useState } from "react";

function Home({ setOriginal, setTranslation, setShowResult }) {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("French");
  const [loading, setLoading] = useState(false);

  async function translateText() {
    if (!text.trim()) return;

    setLoading(true);
    setOriginal(text);

    try {
      const response = await fetch(
        "https://pollyglot2026.pollyglot-zahra.workers.dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            language,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Server error");
      }

      if (!data.translation) {
        throw new Error("No translation returned");
      }

      setTranslation(data.translation);
      setShowResult(true);
    } catch (error) {
      console.error(error);
      alert("Translation failed. Check Worker or API key.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="phone">
      <div className="header">
        <img src="/logo.jpg" alt="logo" />

        <div className="header-text">
          <h1>PollyGlot</h1>
          <p>Perfect Translation Every Time</p>
        </div>
      </div>

      <h3>Text to translate 👇</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you?"
      />

      <h3>Select language 👇</h3>

      <div className="radio">
        <label>
          <input
            type="radio"
            value="French"
            checked={language === "French"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          French 🇫🇷
        </label>

        <label>
          <input
            type="radio"
            value="Spanish"
            checked={language === "Spanish"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Spanish 🇪🇸
        </label>

        <label>
          <input
            type="radio"
            value="Japanese"
            checked={language === "Japanese"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Japanese 🇯🇵
        </label>
      </div>

      <button onClick={translateText} disabled={loading}>
        {loading ? "Translating..." : "Translate"}
      </button>
    </div>
  );
}

export default Home;
