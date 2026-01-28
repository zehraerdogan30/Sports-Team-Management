import React from "react";
import "./Info.css";  

interface InfoProps {
  message: string;
}

const Info: React.FC<InfoProps> = ({ message }) => {
  return (
    <div className="info-box">
      {message}
    </div>
  );
};

export default Info;
