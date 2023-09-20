import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_rounded from "highcharts-rounded-corners";
HC_rounded(Highcharts);

const ChartStackedVertikal = ({ className, width, height,data, color }) => {
  // const total = data[0] + data[1]
  // const max = Math.max(...data)
  
  console.log(height);
  const options = {
    chart: {
      type: "column",
      // height: 81,
      spacing: [0, 0, 0, 0],
      marginRight: 0,
      marginTop: 0,
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
      labels: {
        formatter: function () {
          return "Rp " + this.value.toLocaleString(); // Menambahkan "Rp" pada label sumbu nilai
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false, // Menyembunyikan kreditttt
    },
    plotOptions: {
      column: {
        stacking: "normal",
        borderRadius: 10,
      },
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

        borderRadius: 10,
        pointPadding: 0,
        groupPadding: 0,
      },
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        showInLegend: false,
        color: color[0],
        data: data[0],
        borderRadiusTopLeft: "50%",
        borderRadiusTopRight: "50%",
        marginLeft: -500,
      },
      {
        showInLegend: false,
        color: color[1],
        data: data[1],
        // borderRadiusTopLeft: "30%",
        // borderRadiusTopRight: "30%",
        marginLeft: -500,
      },
      {
        showInLegend: false,
        color: color[2],
        data: data[2],
        borderRadiusBottomLeft: "40%",
        borderRadiusBottomRight: "40%",
      },
    ],
  };

  const chartStyle = {
    height: height ? height : 100,
    width: width ? width : 38,
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

export default ChartStackedVertikal;
