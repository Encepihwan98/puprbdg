import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_rounded from "highcharts-rounded-corners";
HC_rounded(Highcharts);

const BarchartStacked = ({ className, width, data }) => {
  const options = {
    chart: {
      type: "bar",
      height: 80,
      spacing: [0, 0, 0, 0],
    },
    title: {
      text: null,
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
      max: null,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          color: "#FFFFFF",
          textOutline: "none",
          style: {
            fontSize: "20px",
            textOutline: "none",
          },
        },
      },
    },
    series: [
      {
        data: data[1],
        showInLegend: false,
        color: "#c62c11",
        borderRadiusTopLeft: "30%",
        borderRadiusTopRight: "30%",
      },
      {
        showInLegend: false,
        color: "#00917c",
        data: data[0],
        borderRadiusBottomLeft: "30%",
        borderRadiusBottomRight: "30%",
      },
    ],
  };
  const chartStyle = {
    width: width ? width : 200,
  };

  return (
    <div style={chartStyle}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        className="chart-container"
      />
    </div>
  );
};

export default BarchartStacked;
