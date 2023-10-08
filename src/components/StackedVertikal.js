import React from "react";

const StackedVertikal = ({ data, marginTop }) => {
  // const total = data[0] + data[1]
  // const max = Math.max(...data)
  console.log(data);
  const [topValue, centerValue, underValue] = data;

  const stackedStyle = {
    height: "330px",
    width: "38px",
    margin: `${marginTop} 0 0 0`,
  };

  return (
    <div  style={stackedStyle}>
      <div className="stacked-top">
        <span>{topValue}</span>
      </div>
      <div className="stacked-center">
        <span>{centerValue}</span>
      </div>
      <div className="stacked-under">
        <span>{underValue}</span>
      </div>
    </div>
  );
};

export default StackedVertikal;
