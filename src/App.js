import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Button, Input } from "./components/atoms";

function App() {
  //modifie pour avoir un compteur qui s'incremente
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <div className="App">
      <Button buttonTitle={"test"} action={handleClick} />
      <Input />
    </div>
  );
}

export default App;
