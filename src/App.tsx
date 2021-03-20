import React from "react";
import "./App.css";
import Button from "./components/Button";

const App: React.FC = () => {
  return (
    <div>
      <Button
        onClick={() => {
          console.log("hello");
        }}
      >
        Button
      </Button>
    </div>
  );
};

export default App;
