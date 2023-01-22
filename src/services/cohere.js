import axios from "axios";
/**
 * summarizes text using cohere
 * @param {*} input input text for summarization as a string
 * @returns the input text summarized
 */
export const getTextSummary = async (input) => {
  return await axios
    .post(
      `http://localhost:8080/summarize/text`,
      { input },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .catch(function (error) {
      console.log("error", error);
    });
};
