import React from "react";
import { Triangle } from "react-loader-spinner";

const FetchingLoader = () => {
  const styleObj = {
    position: "absolute !important",
    marginTop: "-10vh",
    zIndex: "2000 !important",
    backdropFilter: "blur(2px)",
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={styleObj}>
      <Triangle
        height="300"
        width="300"
        color="#00358e"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default FetchingLoader;
