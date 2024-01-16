import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_rounded from "highcharts-rounded-corners";
HC_rounded(Highcharts);

const ChartStacked = ({ className, width, data, color }) => {
  // const total = data[0] + data[1]
  // const max = Math.max(...data)
  //console.log(color[1]);
  const options = {
    chart: {
      type: "bar",
      height: 81,
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
        color: color[1],
        data: data[1],
        borderRadiusTopLeft: "30%",
        borderRadiusTopRight: "30%",
        marginLeft: -500,
      },
      {
        showInLegend: false,
        color: color[0],
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
        className={{ className }}
      />
    </div>
  );
};

export default ChartStacked;
