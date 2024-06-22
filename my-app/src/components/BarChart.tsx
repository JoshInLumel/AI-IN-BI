import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = (props: { chartData: Highcharts.Options }) => {
  const { chartData } = props;

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartData} />
    </div>
  );
};

export default BarChart;
