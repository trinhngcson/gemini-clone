import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prePrompts, setPrePrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    const res = await run(input);
    if (res) {
      let resArray = res.split("**");
      let newRes = "";
      for (let i = 0; i < resArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newRes += resArray[i];
        } else {
          newRes += "<b>" + resArray[i] + "</b>";
        }
      }
      let newRes2 = newRes.split("*").join("</br>");
      let newResArray = newRes2.split(" ");
      for (let i = 0; i < newResArray.length; i++) {
        const nextWord = newResArray[i];
        delayPara(i, nextWord + " ");
      }
    }
    setLoading(false);
    setInput("");
  };
  const contextValue = {
    onSent,
    input,
    setInput,
    prePrompts,
    setPrePrompts,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
