import React from "react";
import "./App.css";
import firebase from "firebase/app";

const App: React.FC = () => {
  const firebaseApp = firebase.apps[0];
  return (
    <div>
      <h1>React & Firebase</h1>
      <h2>By Mwibutsa</h2>
      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>
    </div>
  );
};

export default App;
