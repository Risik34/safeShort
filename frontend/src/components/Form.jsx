import { useState } from "react";
import postUrl from "../util/index";
import linkIcon from "../assets/link.svg";
import clipboard from "../assets/clipboard.svg";
import webwindow from "../assets/webwindow.svg"
import loader from "../assets/loader.svg"

const Form = () => {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading,setIsLoading]=useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const res = await postUrl(input.trim().toLowerCase());
    setShortUrl(res);
    setIsLoading(false)
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400">
        Shorten Your Long URLs Instantly!
      </h1>

      <form
        className="flex w-full max-w-lg p-2 bg-gray-800 rounded-lg shadow-lg"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          className="flex-grow p-3 text-xl text-gray-900 rounded-l-lg focus:outline-none"
          placeholder="Paste your long URL here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center p-3 bg-cyan-500 rounded-r-lg hover:bg-cyan-600 transition-colors"
        >
          <img src={linkIcon} alt="Shorten" className="w-6 h-6 text-white" />
        </button>
      </form>

      {isLoading&&(
      <div className=" p-6 mt-6">
          <img className="size-10 animate-spin" src={loader}/>
        </div>
      )}
      {/* Display short URL and Copy Me button */}
      {shortUrl && (
        <div className="p-6 w-full max-w-lg text-center flex justify-center gap-3">
          <button
            onClick={copyToClipboard}
            className="flex items-center px-6 py-3 bg-cyan-500 rounded-lg text-xl font-semibold hover:bg-cyan-600 scale-up-center"
          >
            <img className="size-8 mr-2 bg" src={clipboard}/>
            Copy url 
          </button>
          <button
            onClick={()=>{window.location.href=shortUrl}}
            className="flex items-center px-6 py-3 bg-cyan-500 rounded-lg text-xl font-semibold hover:bg-cyan-600 transition-colors scale-up-center"
          >
            <img className="size-8 mr-2 bg" src={webwindow}/>
            Try out
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
