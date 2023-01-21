import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

let fromLang = "en";
let toLang = "zh-CN"; // translate to norwegian

const API_KEY = process.env.API_KEY;

function App() {
  const [text, setText] = useState(
    "good luck to everyone participating in the hackathon this year! we will be making our own application and trying our best to win some cool prizes!"
  );

  useEffect(() => {
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += "&q=" + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response from google: ", response);
      })
      .catch((error) => {
        console.log("There was an error with the translation request: ", error);
      });
  }, []);

  const handleSubmit = () => {
    translateText();
  };

  return (
    <div className="App">
      <textarea value={text} onChange={setText} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
