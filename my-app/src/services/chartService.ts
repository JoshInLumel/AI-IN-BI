export default class ChartService {
  // need to generate chart config with help of AI
  public static getDummyBarChartData = () => {
    const options: Highcharts.Options = {
      chart: {
        type: "column",
      },
      title: {
        text: "Test Bar Chart",
      },
      xAxis: {
        categories: ["Category 1", "Category 2", "Category 3"],
      },
      yAxis: {
        title: {
          text: "Values",
        },
      },
      series: [
        {
          name: "Series 1",
          type: "column",
          data: [1, 2, 3],
        },
        {
          name: "Series 2",
          type: "column",
          data: [4, 5, 6],
        },
      ],
    };

    return options;
  };
}
