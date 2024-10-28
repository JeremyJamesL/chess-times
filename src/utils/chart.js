const formatDataForChart = (chartData, isWin) => {
  const dataArr = [];
  const labelsArr = [];
  for (const key in chartData) {
    labelsArr.push(key);
    if (isWin) dataArr.push(chartData[key]["winPercentage"]);
    else dataArr.push((100 - chartData[key]["winPercentage"]).toString());
  }
  return dataArr;
};

export function createChart(
  querySelection,
  labelX,
  labelY,
  colourX,
  colourY,
  data
) {
  const xData = formatDataForChart(data, true);
  const yData = formatDataForChart(data, false);

  return new Chart(document.querySelector(querySelection), {
    type: "bar",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: labelX,
          data: xData,
          borderWidth: 1,
          backgroundColor: colourX,
        },
        {
          label: labelY,
          data: yData,
          borderWidth: 1,
          backgroundColor: colourY,
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
}
