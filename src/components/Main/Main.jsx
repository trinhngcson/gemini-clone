import { useContext } from "react";
import { assets, data } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    resultData,
  } = useContext(Context);

  return (
    <div className="flex-1 relative min-h-screen pb-[15vh]">
      <div className="flex items-center justify-between text-xl p-5 text-gray-700">
        <p>Gemini</p>
        <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
      </div>
      <div className="max-w-4xl m-auto">
        {!showResult ? (
          <>
            <div className="my-12 text-6xl text-gray-400 font-medium p-5">
              <p>
                <span className="font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text">
                  Hello, Dev.
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="relative card h-48 p-4 rounded-lg cursor-pointe bg-gray-300 hover:bg-gray-400 hover:scale-105 cursor-pointer transition-all duration-700"
                  onClick={() => onSent(item.title)}
                >
                  <p className="text-gray-700 text-lg">{item.title}</p>
                  <img
                    className="absolute w-9 p-1 bg-white rounded-2xl bottom-2 right-2"
                    src={item.icon}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="px-0 py-[5%] max-h-[70vh] overflow-y-scroll md:no-scrollbar">
            <div className="flex items-center gap-5 mx-0 my-10">
              <img
                className="w-10 rounded-full"
                src={assets.user_icon}
                alt=""
              />
              <p>{recentPrompt}</p>
            </div>
            <div className="flex gap-5">
              <img
                className={`w-10 h-10 rounded-full ${
                  loading ? `animate-spin` : ""
                }`}
                src={assets.gemini_icon}
                alt=""
              />
              {loading ? (
                <div className="flex w-screen flex-col gap-2">
                  <hr className="h-5 border-none rounded-md bg-gray-100 bg-cover bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-loader" />
                  <hr className="h-5  border-none rounded-md bg-gray-100 bg-cover bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-loader" />
                  <hr className="h-5 w-[60%] border-none rounded-md bg-gray-100 bg-cover bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-loader" />
                </div>
              ) : (
                <p
                  className="text-lg text-gray-700 my-4 p-2"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                />
              )}
            </div>
          </div>
        )}

        <div className="absolute w-full bottom-8 md:bottom-20 max-w-4xl m-auto px-5">
          <div className="py-1 md:py-2 px-2 md:px-5 flex items-center justify-between gap-5 bg-gray-300 rounded-full">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
              placeholder="Ask Gemini"
              className="flex-none w-36 md:flex-1 bg-transparent border-none outline-none p-2 text-lg"
            />
            <div className="gap-1 md:gap-4 flex items-center ">
              <img
                className="w-5 md:w-6 cursor-pointer"
                src={assets.gallery_icon}
                alt=""
              />
              <img
                className="w-5 md:w-6 cursor-pointer"
                src={assets.mic_icon}
                alt=""
              />
              {input && (
                <img
                  onClick={() => onSent()}
                  className="w-5 md:w-6 cursor-pointer"
                  src={assets.send_icon}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
