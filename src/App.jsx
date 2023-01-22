import { useState, useEffect } from "react";
import "./App.css";
import {
  translateText,
  photoToText,
  detectLanguage,
} from "./services/translatation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import languages from "./assets/langs";
import { getTextSummary } from "./services/cohere";
import CameraComponent from "./components/CameraComponent";
import MyModal from "./components/output.jsx";
import Summary from "./components/Summary";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TitleIcon from "@mui/icons-material/Title";
import Alert from "@mui/material/Alert";

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("auto");
  const [desiredLanguage, setDesiredLanguage] = useState("en");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [textInputOpen, setTextInputOpen] = useState(false);
  const [photo, setPhoto] = useState();
  const [showOutput, setShowOutput] = useState(false);
  const [summarizedText1, setSummarizedText1] = useState("");
  const [summarizedText2, setSummarizedText2] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  // const handleSubmit = async () => {
  //   let newtext = await translateText(desiredLanguage, text);
  //   setTranslatedText(newtext);
  //   newtext = await getTextSummary(newtext);
  //   console.log(newtext);
  //   setSummarizedText(newtext.data.body.generations[0].text);
  // };

  const handleSubmit = async (event) => {
    var detectedLanguage = "";
    if (inputLanguage == "auto") {
      detectedLanguage = await detectLanguage(text);
    } else {
      detectedLanguage = inputLanguage;
    }
    if (detectedLanguage != desiredLanguage) {
      setShowOutput(true);
      let translatation = await translateText(
        detectedLanguage,
        desiredLanguage,
        text
      );
      setTranslatedText(translatation);
      console.log(translatation);
      const sumtext1 = await getTextSummary(translatation, 50);
      const sumtext2 = await getTextSummary(translatation, 100);
      setSummarizedText1(sumtext1.data.body.generations[0].text);
      setSummarizedText2(sumtext2.data.body.generations[0].text);
      setAlertMsg("");
    } else {
      setAlertMsg("The Languages seem to be matching, try again.");
    }
  };

  async function handleSubmitPhoto() {
    const photoText = await photoToText(photo);
    console.log("final text ----- ", photoText);
    setCameraOpen(false);

    console.log("this is the photo", photo);
  }

  return (
    <div className="App">
      {showOutput ? (
        <Summary
          setShowOutput={setShowOutput}
          summarizedText1={summarizedText1}
          summarizedText2={summarizedText2}
          translatedText={translatedText}
        />
      ) : (
        <></>
      )}
      <img src="src\assets\logo.svg" className="logo" />
      <h2>Tap to Summarize Text</h2>
      {cameraOpen ? (
        <CameraComponent
          handleSubmitPhoto={handleSubmitPhoto}
          setCameraOpen={setCameraOpen}
          photo={photo}
          setPhoto={setPhoto}
        />
      ) : (
        <div
          style={
            textInputOpen
              ? { width: 50, height: 50 }
              : { width: 200, height: 200 }
          }
          className="camera_button"
          onClick={() => {
            setTextInputOpen(false);
            setCameraOpen(true);
          }}
        >
          <CameraAltIcon
            sx={
              textInputOpen
                ? { fontSize: 20, color: "black" }
                : { fontSize: 73, color: "black" }
            }
          />
        </div>
      )}

      {textInputOpen ? (
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      ) : (
        <div
          className="textinput_button"
          onClick={() => {
            setCameraOpen(false);
            setTextInputOpen(true);
          }}
        >
          <TitleIcon sx={{ fontSize: 30, color: "black" }} />
        </div>
      )}

      <div className="selectors_container">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-in-label">Translate From</InputLabel>
          <Select
            labelId="select-in-label"
            id="select-in"
            value={inputLanguage}
            label="Input"
            onChange={(e) => {
              setInputLanguage(e.target.value);
            }}
          >
            <MenuItem key={0} value={"auto"}>
              Auto Detect
            </MenuItem>
            {languages.map((item, index) => {
              return (
                <MenuItem key={index + 1} value={item.code}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-out-label">Translate To</InputLabel>
          <Select
            labelId="select-out-label"
            id="select-out"
            value={desiredLanguage}
            label="Output"
            onChange={(e) => {
              setDesiredLanguage(e.target.value);
            }}
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
      {textInputOpen ? (
        <button onClick={handleSubmit} style={{ marginTop: 20 }}>
          Submit
        </button>
      ) : (
        <></>
      )}
      {alertMsg ? (
        <div style={{ marginTop: 15 }}>
          <Alert severity="warning">{alertMsg}</Alert>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
