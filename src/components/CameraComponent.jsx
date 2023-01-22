import React from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export default function CameraComponent({
  handleTakePhoto,
  photo,
  setCameraOpen,
}) {
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }
  return (
    <div>
      <button
        onClick={() => {
          setCameraOpen(false);
        }}
      >
        X
      </button>
      <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />
    </div>
  );
}
