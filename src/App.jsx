import { useState, useEffect } from "react";
import "./App.css";
import { translateText } from "./services/translatation";

function App() {
  const [text, setText] = useState(
    "good luck to everyone participating in the hackathon this year! we will be making our own application and trying our best to win some cool prizes!"
  );
  const [translatedText, setTranslatedText] = useState("");

  const handleSubmit = async () => {
    const newtext = translateText("en", "zh-CH", text);
    console.log(newtext);
    setTranslatedText(newtext);
  };

  return (
    <div className="App">
      <textarea value={text} onChange={setText} />
      <button onClick={handleSubmit}>Submit</button>
      <p>{translatedText}</p>
    </div>
  );
}

export default App;
