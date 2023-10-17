import React from "react";

const MeteranMacetplan = ({ data, marginTop }) => {
  // const total = data[0] + data[1]
  // const max = Math.max(...data)
  console.log(data);
  const [meteranMacetPlan] = data;

  const stackedStyle = {
    height: "330px",
    width: "38px",
    margin: `${marginTop} 0 0 0`,
  };

  return (
    <div  style={stackedStyle}>
      <div className="macet-plan">
        <span>{meteranMacetPlan}</span>
      </div>
    </div>
  );
};

export default MeteranMacetplan;
