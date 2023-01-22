import React from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export default function CameraComponent({
  handleSubmitPhoto,
  setCameraOpen,
  photo,
  setPhoto,
}) {
  return (
    <div>
      <button
        onClick={() => {
          setCameraOpen(false);
        }}
      >
        X
      </button>
      {photo ? (
        <div>
          <img src={photo} />
          <button
            onClick={() => {
              setPhoto("");
            }}
          >
            Retake
          </button>
          <button onClick={handleSubmitPhoto}>Looks Good!</button>
        </div>
      ) : (
        <Camera
          onTakePhoto={(dataUri) => {
            setPhoto(dataUri);
          }}
        />
      )}
    </div>
  );
}
