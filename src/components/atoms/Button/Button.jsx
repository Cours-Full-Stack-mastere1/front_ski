import React, { useState } from "react";

const Button = ({ buttonTitle, action, ...props }) => {
  const [label, setLabel] = useState(buttonTitle);
  return (
    <>
      <span className="nes-pointer">
        <h1 onClick={action} /* className={styledButton} */>{label}</h1>
      </span>
    </>
  );
};
export default Button;
