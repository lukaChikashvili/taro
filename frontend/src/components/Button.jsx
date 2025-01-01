import React from "react";

const Button = ({ name, icon, width, bg , border, color}) => {
  return (
      <div>
     <button style={{width: width, backgroundColor: bg, border: border, color: color}}>{icon}{name}</button>
     </div>
  );
};

export default Button;
