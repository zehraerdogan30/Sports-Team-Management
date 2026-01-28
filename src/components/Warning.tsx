import React from "react";

interface WarningProps {//ihtiyacın olan componentın tipini belirlemek için
  message: string;
}

const Warning: React.FC<WarningProps> = ({ message }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        backgroundColor: "#fff3cd",
        border: "1px solid #ffecb5",
        padding: "12px",
        borderRadius: "6px",
        color: "#664d03",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
};

export default Warning; //component'ı dısarı  acar
