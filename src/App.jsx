import { useState, useEffect } from "react";
import "./App.css";
import { translateText } from "./services/translatation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import languages from "./assets/langs";

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [desiredLanguage, setDesiredLanguage] = useState("en");

  const handleSubmit = async () => {
    const newtext = await translateText(desiredLanguage, text);
    setTranslatedText(newtext);
  };

  const handleSelectChange = (event) => {
    setDesiredLanguage(event.target.value);
    console.log(desiredLanguage);
  };

  return (
    <div className="App">
      <div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <FormControl fullWidth>
          <InputLabel id="select-label">Output</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={desiredLanguage}
            label="Age"
            onChange={handleSelectChange}
          >
            {languages.map((item, index) => {
              return (
                <MenuItem key={index} value={item.code}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <p>{translatedText}</p>
    </div>
  );
}

export default App;
