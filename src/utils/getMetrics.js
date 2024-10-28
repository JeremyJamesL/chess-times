const getPerfPerDay = (games) => {
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

  for (const key in dailyRatio) {
    const winPercentage =
      (dailyRatio[key]["wins"] /
        (dailyRatio[key]["wins"] + dailyRatio[key]["losses"])) *
      100;
    dailyRatio[key]["winPercentage"] = winPercentage.toFixed(2);
  }

  return dailyRatio;
};

const getPerfPerHour = (games) => {
  const hourlyPerf = {};
  let i = 0;
  while (i <= 24) {
    hourlyPerf[i] = {
      wins: 0,
      losses: 0,
    };
    i++;
  }

  games.forEach((game) => {
    if (game.win) hourlyPerf[game.timeOfDay].wins += 1;
    else hourlyPerf[game.timeOfDay].losses += 1;
  });

  for (const key in hourlyPerf) {
    const winPercentage =
      (hourlyPerf[key]["wins"] /
        (hourlyPerf[key]["wins"] + hourlyPerf[key]["losses"])) *
      100;

    hourlyPerf[key]["winPercentage"] = winPercentage.toFixed(2);

    // Delete key is it has no wins or losses
    if ((hourlyPerf[key]["wins"] === 0) | (hourlyPerf[key]["losses"] === 0))
      delete hourlyPerf[key];
  }

  return hourlyPerf;
};

const getHeadlinePerf = (data) => {
  const lowest = Object.entries(data).reduce(
    (min, [day, stats]) => {
      return parseFloat(stats.winPercentage) < parseFloat(min[1].winPercentage)
        ? [day, stats]
        : min;
    },
    ["", { winPercentage: "100" }]
  );

  const highest = Object.entries(data).reduce(
    (max, [day, stats]) => {
      return parseFloat(stats.winPercentage) > parseFloat(max[1].winPercentage)
        ? [day, stats]
        : max;
    },
    ["", { winPercentage: "0" }]
  );

  return [lowest, highest];
};

export { getPerfPerDay, getPerfPerHour, getHeadlinePerf };
