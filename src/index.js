import { processData } from "./utils/getMetrics.js";
const app = document.querySelector("#app");
const form = document.querySelector("#form");
const formInput = document.querySelector("#forminput");
const usernameText = document.querySelector("#username");

const username = "Dippyville";
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
  const userExistsRes = await fetch(`${baseURL}/${formInput.value}`);
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
  app?.classList.remove("hidden");
  playerName = formInput.value;
  usernameText.textContent = playerName;
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
        subGame.black.username === username && subGame.black.result === "win"
          ? true
          : subGame.white.username === username &&
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
  return allGameData.flat();
};

const getArchives = async () => {
  const archiveResponse = await fetch(
    "https://api.chess.com/pub/player/dippyville/games/archives"
  );
  const archiveData = await archiveResponse.json();
  return archiveData.archives;
};

const handleFormSubmit = async (e) => {
  console.log("logging");
  e.preventDefault();
  //1. Check if user exists
  checkUserExists();
  const gamesArchives = await getArchives();
  const allGames = await getAllGames(gamesArchives);
  const processedData = processData(allGames);
};

form.addEventListener("submit", handleFormSubmit);
