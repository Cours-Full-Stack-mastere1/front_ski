import React, { useState } from "react";
import "./button.css";

const Button = ({ buttonTitle, action, ...props }) => {
  const [label, setLabel] = useState(buttonTitle);
  return (
    <>
      <span>
        <h1
          className="monBouton"
          onClick={action} /* className={styledButton} */
        >
          {label}
        </h1>
      </span>
    </>
  );
};
export default Button;
