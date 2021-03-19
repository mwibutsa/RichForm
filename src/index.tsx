import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvK4PGZMODF-o3JRqXuGcB2bwDacwVpxU",
  authDomain: "richform-7b503.firebaseapp.com",
  projectId: "richform-7b503",
  storageBucket: "richform-7b503.appspot.com",
  messagingSenderId: "12164980399",
  appId: "1:12164980399:web:2b9ca0d25a83a5af34fe5a",
  measurementId: "G-8RTCMCDMLS",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
