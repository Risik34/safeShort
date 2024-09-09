import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectComponent = () => {
  const [url, setUrl] = useState("");

  const { token } = useParams();

  useEffect(() => {
    fetch(`https://safeshort.risidev.workers.dev/${token}`)
      .then((res) => res.json())
      .then((data) => setUrl(data.url));
    console.log(url)
  }, [token ]);

  const handleRedirect = () => {
    window.location.href =url 
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {url ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">
            Do you want to visit this site?
          </h2>
          <p className="text-cyan-400 mb-6">{url}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleRedirect}
              className="bg-cyan-400 text-gray-900 px-4 py-2 rounded hover:bg-cyan-500 w-full"
            >
              Yes
            </button>
          </div>
        </div>
      ):(
      <h1 className="text-white">Loading</h1>
      )}
    </div>
  );
};

export default RedirectComponent;
