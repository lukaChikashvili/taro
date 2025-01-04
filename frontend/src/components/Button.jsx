import React from "react";

const Button = ({ name, icon, width, bg , border, color, onClick}) => {
  return (
      <div>
     <button onClick={onClick} style={{width: width, backgroundColor: bg, border: border, color: color}}>{icon}{name}</button>
     </div>
  );
};

export default Button;
