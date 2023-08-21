import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../util";

export default function NumGen() {
  const [result, setresult] = useState();
  const [showResult, setshowResult] = useState(false);
  const [message, setmessage] = useState();
  const [status, setstatus] = useState();

  const NumberGenerator = () => {
    setmessage("");
    const min = 100000;
    const max = 999999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    // const number = 117331;
    handleSelect(number);
  };

  const handleSelect = async (number) => {
    const response = await axios.post(baseURL + "api/numgen", {
      number,
    });

    // const response = await axios.post(baseURL + "api/send");
    console.log(response.data);
    const status = response.data.status;
    if (status === 1) {
      setresult(number);
      setshowResult(true);
    }
    if (status === 0) {
      console.log(response.data.message);
      NumberGenerator();
    }
  };

  const handleSubmit = async () => {
    const response = await axios.post(baseURL + "api/savedata", {
      result,
    });
    console.log(response.data.value);
    setmessage(response.data.message);
    setstatus(response.data.status);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Random Number Generator</h1>
      <div className="main">
        <div className="ac">
          <div>
            <button className="button" onClick={NumberGenerator}>
              Generate
            </button>
          </div>
          <div>{showResult && <h3>Number generated is: {result}</h3>}</div>
          <div>
            {showResult && (
              <button className="button" onClick={handleSubmit}>
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
