import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prePrompts, setRecentPrompt, newChat, loading } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="hidden md:inline-flex h-screen flex-col justify-between bg-gray-100 py-6 px-5">
      <div className="">
        <img
          onClick={() => setExtended(!extended)}
          className="block w-5 ml-2 cursor-pointer "
          src={assets.menu_icon}
          alt=""
        />
        <div
          onClick={() => newChat()}
          className="inline-flex mt-12 items-center gap-2 py-2 px-4 bg-blue-200 rounded-3xl text-sm text-gray-500 cursor-pointer "
        >
          <img className="w-5" src={assets.plus_icon} alt="" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="flex flex-col">
            <p className="mt-7 mb-5">Recent</p>
            {prePrompts
              .filter((item) => item.trim() !== "")
              .map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 p-2 pr-10 rounded-3xl ${
                    loading
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "text-gray-800 cursor-pointer hover:bg-gray-300"
                  }  `}
                  onClick={() => !loading && loadPrompt(item)}
                >
                  <img className="w-5" src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="flex flex-col ">
        <div className="pr-2 cursor-pointer flex items-start gap-2 p-2 rounded-3xl text-gray-800  hover:bg-gray-300">
          <img className="w-5" src={assets.question_icon} alt="" />
          {extended && <p className="">Help</p>}
        </div>
        <div className="pr-2 cursor-pointer flex items-start gap-2 p-2 rounded-3xl text-gray-800 hover:bg-gray-300">
          <img className="w-5" src={assets.history_icon} alt="" />
          {extended && <p className="">Activity</p>}
        </div>
        <div className="pr-2 cursor-pointer flex items-start gap-2 p-2 rounded-3xl text-gray-800  hover:bg-gray-300">
          <img className="w-5" src={assets.setting_icon} alt="" />
          {extended && <p className="">Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
