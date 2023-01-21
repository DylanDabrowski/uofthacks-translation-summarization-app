import { useState, useEffect } from "react";
import "./App.css";
import { translateText } from "./services/translatation";

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleSubmit = async () => {
    const newtext = await translateText("en", "zh-CH", text);
    console.log(newtext);
    setTranslatedText(newtext);
  };

  return (
    <div className="App">
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <p>{translatedText}</p>
    </div>
  );
}

export default App;
