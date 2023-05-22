import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartStacked = ({ className, width, data }) => {
  console.log(data[0]);
  const options = {
    chart: {
      type: "bar",
      height: 40,
      spacing: [0, 0, 0, 0],
      marginRight: 0,
    },
    title: {
      text: null,
    },
    xAxis: {
      visible: false,
      // max: 70,
    },
    yAxis: {
      visible: false,
      max:null,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false, // Menyembunyikan kredit
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
        // borderRadius: 10,
        pointPadding: 0,
        groupPadding: 0,
      },
      bar: {
        borderRadius: 10,
      },
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        showInLegend: false,
        color: "#c62c11",
        data: data[1],
      },
      {
        showInLegend: false,
        color: "#00917c",
        data: data[0],
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
        className={{ className }}
      />
    </div>
  );
};

export default ChartStacked;
