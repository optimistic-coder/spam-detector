import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require("axios");
function App() {
  const [msg, setMesg] = useState("");
  const [result, setResult] = useState(0);

  const submit = () => {
    axios
      .post("http://127.0.0.1:5000/predict", {
        message: msg,
      })
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      });
  };
  return (
    <div
      style={{
        background: "linear-gradient(to right bottom, #00b200 , #006600",
        height: 800,
        textAlign: "center",
      }}
    >
      <div style={{ flex: 1, flexDirection: "column" }}>
        <span
          style={{
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 30,
            color: "white",
            // marginTop: "20%",
          }}
        >
          spam detector
        </span>
      </div>
      <div>
        <div
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#e5e5e5",
            width: "30%",
            height: 300,
            marginLeft: "35%",
            marginTop: "5%",
          }}
        >
          <div>
            <textarea
              onChange={(e) => setMesg(e.target.value)}
              style={{
                width: "80%",
                padding: 10,
                fontSize: 30,
                marginTop: 40,
                borderRadius: 16,
                height: 130,
              }}
            />
          </div>
          <div>
            <button
              onClick={() => submit()}
              style={{
                backgroundColor: "#00b200",
                padding: 10,
                width: "83%",
                marginTop: 15,
                color: "white",
                borderRadius: 16,
                fontSize: 17,

                borderWidth: 0,
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        {result == 0 ? (
          <div>
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
                letterSpacing: 1,
              }}
            >
              Safe
            </span>
          </div>
        ) : (
          <div>
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
                letterSpacing: 1,
              }}
            >
              Not Safe, Be secure
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
