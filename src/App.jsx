import { useState, useEffect } from "react";
import "./App.css";
import { translateText } from "./services/translatation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import languages from "./assets/langs";
import { getTextSummary } from './services/cohere'
import CameraComponent from "./components/CameraComponent";

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [desiredLanguage, setDesiredLanguage] = useState("en");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState();

  const [summarizedText, setSummarizedText] = useState("");
  const handleSubmit = async () => {
    let newtext = await translateText(desiredLanguage, text);
    setTranslatedText(newtext);
    newtext = await getTextSummary(newtext)
    console.log(newtext)
    setSummarizedText(newtext.data.body.generations[0].text);
  };

  const handleSelectChange = (event) => {
    setDesiredLanguage(event.target.value);
    console.log(desiredLanguage);
  };

  function handleSubmitPhoto(dataUri) {
    // Do stuff with the photo...
    console.log("submit photo");

    setCameraOpen(false);
  }

  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            setCameraOpen(true);
          }}
        >
          Open Camera
        </button>
        {cameraOpen ? (
          <CameraComponent
            handleTakePhoto={handleSubmitPhoto}
            photo={photo}
            setCameraOpen={setCameraOpen}
          />
        ) : (
          <></>
        )}
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
      <p>{summarizedText}</p>

      {/* <br></br>
      <h2>Cohere Testing</h2>
      <textarea value={text} onChange={e => setText(e.target.value)}/>
      <button onClick={async ()=>{
        const newtext = await getTextSummary(text)
        console.log(newtext);
        setSummarizedText(newtext.data.body.generations[0].text);
      }}>Submit</button>
      <p>{summarizedText}</p> */}
    </div>

    
  );
}

export default App;
