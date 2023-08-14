import React, { useState } from "react";
import axios from "axios";

export default function NumGen() {
  const [result, setresult] = useState();
  const [showResult, setshowResult] = useState(false);
  const [message, setmessage] = useState();
  const [status, setstatus] = useState();

  const handleGenerate = () => {
    setmessage("");
    const min = 100000;
    const max = 999999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    setresult(number);
    setshowResult(true);
  };

  const handleSelect = async () => {
    // setvalue(result)
    const response = await axios.post("http://localhost:5000/api/numgen", {
      // const response = await axios.post(
      //   "https://num-gen.onrender.com/api/numgen",
      //   {
      result,
    });
    setmessage(response.data.message);
    setstatus(response.data.status);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Random Number Generator</h1>
      <div className="main">
        <div className="ac">
          <div>
            <button className="button" onClick={handleGenerate}>
              Generate
            </button>
          </div>
          <div>{showResult && <h3>Number generated is: {result}</h3>}</div>
          <div>
            {showResult && (
              <button className="button" onClick={handleSelect}>
                Select Number
              </button>
            )}
          </div>
          {status === 1 ? (
            <div>
              <p className="success_msg">{message}</p>
            </div>
          ) : (
            ""
          )}
          {status === 0 ? (
            <div>
              <p className="error_msg">{message}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
