export const translateText = (fromLang, toLang, text) => {
  let url = `https://translation.googleapis.com/language/translate/v2?key=${
    import.meta.env.VITE_TRANSLATION_KEY
  }`;
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
      return response.data.translations[0].translatedText;
    })
    .catch((error) => {
      console.log("There was an error with the translation request: ", error);
    });
};
