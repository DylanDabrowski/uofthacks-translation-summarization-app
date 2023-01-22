import { useState, useEffect } from "react";
import "./App.css";
import { translateText } from "./services/translatation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import languages from "./assets/langs";
import CameraComponent from "./components/CameraComponent";

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [desiredLanguage, setDesiredLanguage] = useState("en");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState();

  const handleSubmit = async () => {
    const newtext = await translateText(desiredLanguage, text);
    setTranslatedText(newtext);
  };

  const handleSelectChange = (event) => {
    setDesiredLanguage(event.target.value);
    console.log(desiredLanguage);
  };

  function handleSubmitPhoto(dataUri) {
    // Do stuff with the photo...

    setCameraOpen(false);
    console.log("this is the photo", photo);
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
            handleSubmitPhoto={handleSubmitPhoto}
            setCameraOpen={setCameraOpen}
            photo={photo}
            setPhoto={setPhoto}
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
    </div>
  );
}

export default App;
