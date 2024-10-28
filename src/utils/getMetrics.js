import { createChart } from "./chart.js";
export const processData = (games) => {
  const dailyRatio = {
    Monday: { losses: 0, wins: 0 },
    Tuesday: { losses: 0, wins: 0 },
    Wednesday: { losses: 0, wins: 0 },
    Thursday: { losses: 0, wins: 0 },
    Friday: { losses: 0, wins: 0 },
    Saturday: { losses: 0, wins: 0 },
    Sunday: { losses: 0, wins: 0 },
  };

  games.forEach((game) => {
    if (game.win) dailyRatio[game.dayOfWeek].wins += 1;
    else dailyRatio[game.dayOfWeek].losses += 1;
  });
  console.log(dailyRatio);
  createChart(dailyRatio);
};
