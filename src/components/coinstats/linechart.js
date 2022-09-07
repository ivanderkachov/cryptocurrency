import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"
Chart.register(...registerables);
Chart.defaults.color = 'white'


const Linechart = ({ history }) => {
  const data = {
    labels: Object.keys(history).reverse(),
    datasets: [
      {
        label: "Price to USD",
        data: Object.values(history).reverse(),
        fill: true,
        backgroundColor: "rgba(255,255,255, 0.4)",
        borderColor: "rgba(255,255,255, 0.4)",
        color: "white",
      },
    ],
  };
  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }
  //     ]
  //   }
  // }
  return (
    <div>
      <Line data={data}  />
    </div>
  )
}

export default Linechart