import {
  getPerfPerDay,
  getPerfPerHour,
  getHeadlinePerf,
} from "./utils/getMetrics.js";
import { createChart } from "./utils/chart.js";
const app = document.querySelector("#app");
const form = document.querySelector("#form");
const formInput = document.querySelector("#forminput");
const usernameText = document.querySelector("#username");
const gameCount = document.querySelector("#gameCount");
const spinner = document.querySelector("#spinner");

// Day perf selectors
const highPerfDay = document.getElementById("highPerfDay");
const highPerfDayScore = document.getElementById("highPerfDayScore");
const lowPerfDay = document.getElementById("lowPerfDay");
const lowPerfDayScore = document.getElementById("lowPerfDayScore");

// Hour perf selectors
const highPerfHour = document.getElementById("highPerfHour");
const highPerfHourScore = document.getElementById("highPerfHourScore");
const lowPerfHour = document.getElementById("lowPerfHour");
const lowPerfHourScore = document.getElementById("lowPerfHourScore");

let totalGames = 0;
let dayChart;
let hourChart;
let baseURL = `https://api.chess.com/pub/player`;
let playerName = "";
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Functions
const checkUserExists = async () => {
  const userExistsRes = await fetch(`${baseURL}/${playerName}`);
  const userExistsData = await userExistsRes.json();

  if (userExistsData.code === 0) {
    formInput.classList.add(
      "border-2",
      "border-red-500",
      "focus-visible:border-red-500"
    );
    formInput.blur();
    alert("That username doesn't exist");
    return;
  }

  formInput.classList.remove(
    "border-2",
    "border-red-500",
    "focus-visible:border-red-500"
  );
};

const getAllGames = async (endpoints) => {
  const fetchPromises = endpoints.map((endpoint) =>
    fetch(endpoint).then((response) => {
      if (!response.ok) {
        throw new Error("error");
      }
      return response.json();
    })
  );

  const results = await Promise.all(fetchPromises);

  // Process the games into GameData interface

  const allGameData = results.map((game) => {
    return game.games.map((subGame) => {
      const date = new Date(subGame.end_time * 1000);
      const day = dayNames[date.getUTCDay()];
      const hourOfDay = date.getHours();
      const win =
        subGame.black.username.toLowerCase() === playerName.toLowerCase() &&
        subGame.black.result === "win"
          ? true
          : subGame.white.username.toLowerCase() === playerName.toLowerCase() &&
            subGame.white.result === "win"
          ? true
          : false;

      const gameObj = {
        UTCTime: subGame.end_time,
        dayOfWeek: day,
        timeOfDay: hourOfDay,
        win: win,
        id: subGame.url,
      };

      return gameObj;
    });
  });
  const flattened = allGameData.flat();
  totalGames = flattened.length;
  return flattened;
};

const getArchives = async () => {
  const archiveResponse = await fetch(
    `https://api.chess.com/pub/player/${playerName}/games/archives`
  );
  const archiveData = await archiveResponse.json();
  return archiveData.archives;
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (dayChart) {
    dayChart.destroy();
  }
  if (hourChart) {
    hourChart.destroy();
  }

  spinner.classList.remove("hidden");
  spinner.classList.add("flex");

  playerName = formInput.value;

  checkUserExists();
  const gamesArchives = await getArchives();
  const allGames = await getAllGames(gamesArchives);

  const perfPerDay = getPerfPerDay(allGames);
  const perfPerHour = getPerfPerHour(allGames);

  const [lowestPerfDay, highestPerfDay] = getHeadlinePerf(perfPerDay);
  const [lowestPerfHour, highestPerfHour] = getHeadlinePerf(perfPerHour);

  dayChart = createChart(
    "#dayChart",
    "% of wins",
    "% of losses",
    undefined,
    undefined,
    perfPerDay
  );

  hourChart = createChart(
    "#hourChart",
    "% of wins",
    "% of losses",
    undefined,
    undefined,
    perfPerHour
  );

  // Small DOM adjustments
  usernameText.textContent = playerName;
  gameCount.textContent = totalGames.toLocaleString("en-GB");

  highPerfDay.textContent = highestPerfDay[0];
  highPerfDayScore.textContent = highestPerfDay[1].winPercentage + "%";
  lowPerfDay.textContent = lowestPerfDay[0];
  lowPerfDayScore.textContent = lowestPerfDay[1].winPercentage + "%";

  highPerfHour.textContent = highestPerfHour[0];
  highPerfHourScore.textContent = highestPerfHour[1].winPercentage + "%";
  lowPerfHour.textContent = lowestPerfHour[0];
  lowPerfHourScore.textContent = lowestPerfHour[1].winPercentage + "%";

  // Only show app when the above has completed and we have data to show
  app.classList.remove("hidden");

  spinner.classList.remove("flex");
  spinner.classList.add("hidden");
};

form.addEventListener("submit", handleFormSubmit);
