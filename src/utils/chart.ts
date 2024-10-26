const ctx = document.getElementById("myChart");
import { calculatePercentage } from "../helpers/calculatePerc.js";

export function createChart(dailyRatio) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "% of wins",
          data: [
            calculatePercentage(
              false,
              dailyRatio.Monday.wins,
              dailyRatio.Monday.losses
            ),
            calculatePercentage(
              false,
              dailyRatio.Tuesday.wins,
              dailyRatio.Tuesday.losses
            ),
            calculatePercentage(
              false,
              dailyRatio.Wednesday.wins,
              dailyRatio.Wednesday.losses
            ),
            calculatePercentage(
              false,
              dailyRatio.Thursday.wins,
              dailyRatio.Thursday.losses
            ),
            calculatePercentage(
              false,
              dailyRatio.Friday.wins,
              dailyRatio.Friday.losses
            ),
            calculatePercentage(
              false,
              dailyRatio.Saturday.wins,
              dailyRatio.Saturday.losses
            ),
            calculatePercentage(
              false,
              dailyRatio.Sunday.wins,
              dailyRatio.Sunday.losses
            ),
          ],
          borderWidth: 1,
          backgroundColor: "#0033a0",
        },
        {
          label: "% of losses",
          data: [
            calculatePercentage(
              false,
              dailyRatio.Monday.losses,
              dailyRatio.Monday.wins
            ),
            calculatePercentage(
              false,
              dailyRatio.Tuesday.losses,
              dailyRatio.Tuesday.wins
            ),
            calculatePercentage(
              false,
              dailyRatio.Wednesday.losses,
              dailyRatio.Wednesday.wins
            ),
            calculatePercentage(
              false,
              dailyRatio.Thursday.losses,
              dailyRatio.Thursday.wins
            ),
            calculatePercentage(
              false,
              dailyRatio.Friday.losses,
              dailyRatio.Friday.wins
            ),
            calculatePercentage(
              false,
              dailyRatio.Saturday.losses,
              dailyRatio.Saturday.wins
            ),
            calculatePercentage(
              false,
              dailyRatio.Sunday.losses,
              dailyRatio.Sunday.wins
            ),
          ],

          borderWidth: 1,
          backgroundColor: "#b2b2b2",
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
