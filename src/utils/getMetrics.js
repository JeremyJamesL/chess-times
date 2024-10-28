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
  let i = 1;
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
  // Data either represents daily or hourly perf
  let highest = {
    name: "",
    val: 0,
  };

  let lowest = {
    name: "",
    val: 100,
  };

  for (const key in data) {
    if (data[key]["winPercentage"] > highest.val) {
      highest.val = data[key]["winPercentage"];
      highest.name = key;
    } else break;
  }

  for (const key in data) {
    if (data[key]["winPercentage"] < lowest.val) {
      lowest.val = data[key]["winPercentage"];
      lowest.name = key;
    } else break;
  }

  return [highest, lowest];
};

export { getPerfPerDay, getPerfPerHour, getHeadlinePerf };
