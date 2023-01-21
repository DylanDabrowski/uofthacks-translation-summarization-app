export const detectLanguage = async (text) => {
  let url = `https://translation.googleapis.com/language/translate/v2/detect?key=${
    import.meta.env.VITE_TRANSLATION_KEY
  }`;
  url += "&q=" + encodeURI(text);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await response.json();
    return json.data.detections[0][0].language;
  } catch (error) {
    console.error(error);
  }
};

export const translateText = async (toLang, text) => {
  const fromLang = await detectLanguage(text);

  let url = `https://translation.googleapis.com/language/translate/v2?key=${
    import.meta.env.VITE_TRANSLATION_KEY
  }`;
  url += "&q=" + encodeURI(text);
  url += `&source=${fromLang}`;
  url += `&target=${toLang}`;

  console.log(fromLang, toLang, text);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await response.json();
    return json.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
  }
};
