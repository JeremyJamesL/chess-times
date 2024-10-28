const ctx = document.getElementById("myChart");
import { calculatePercentage } from "../helpers/calculatePerc.js";

export function createChart(dailyRatio) {
  console.log(dailyRatio);
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "% of wins",
          data: [
            calculatePercentage(
              dailyRatio.Monday.wins,
              dailyRatio.Monday.losses
            ),
            calculatePercentage(
              dailyRatio.Tuesday.wins,
              dailyRatio.Tuesday.losses
            ),
            calculatePercentage(
              dailyRatio.Wednesday.wins,
              dailyRatio.Wednesday.losses
            ),
            calculatePercentage(
              dailyRatio.Thursday.wins,
              dailyRatio.Thursday.losses
            ),
            calculatePercentage(
              dailyRatio.Friday.wins,
              dailyRatio.Friday.losses
            ),
            calculatePercentage(
              dailyRatio.Saturday.wins,
              dailyRatio.Saturday.losses
            ),
            calculatePercentage(
              dailyRatio.Sunday.wins,
              dailyRatio.Sunday.losses
            ),
          ],
          borderWidth: 1,
          backgroundColor: "#3b82f6",
        },
        {
          label: "% of losses",
          data: [
            calculatePercentage(
              dailyRatio.Monday.losses,
              dailyRatio.Monday.wins
            ),
            calculatePercentage(
              dailyRatio.Tuesday.losses,
              dailyRatio.Tuesday.wins
            ),
            calculatePercentage(
              dailyRatio.Wednesday.losses,
              dailyRatio.Wednesday.wins
            ),
            calculatePercentage(
              dailyRatio.Thursday.losses,
              dailyRatio.Thursday.wins
            ),
            calculatePercentage(
              dailyRatio.Friday.losses,
              dailyRatio.Friday.wins
            ),
            calculatePercentage(
              dailyRatio.Saturday.losses,
              dailyRatio.Saturday.wins
            ),
            calculatePercentage(
              dailyRatio.Sunday.losses,
              dailyRatio.Sunday.wins
            ),
          ],

          borderWidth: 1,
          backgroundColor: "#94a3b8",
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
