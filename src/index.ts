import { calculatePercentage } from "./helpers/calculatePerc.js";
import { createChart } from "./utils/chart.js";
const app = document.querySelector("#app");
const form = document.querySelector("#form")! as HTMLInputElement;
const formInput = document.querySelector("#forminput")! as HTMLInputElement;
const usernameText = document.querySelector("#username")!;

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

// Interfaces
// Returned from API
interface FullSubGame {
  end_time: number;
  black: { username: string; result: string };
  white: { username: string; result: string };
  url: string;
}

// Returned from allGameData function
interface GameData {
  UTCTime: number;
  dayOfWeek: string;
  timeOfDay: number; // 24 hr format
  win: boolean;
  readonly id: string;
}

// Functions
const checkUserExists = async (): Promise<void | boolean> => {
  const userExistsRes = await fetch(`${baseURL}/${formInput.value}`);
  const userExistsData = await userExistsRes.json();

  if (userExistsData.code === 0) {
    console.log("doesn't exists");
    formInput.classList.add(
      "border-2",
      "border-red-500",
      "focus-visible:border-red-500"
    );
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

const getAllGames = async (endpoints: string[]) => {
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
    return game.games.map((subGame: Partial<FullSubGame>) => {
      const date = new Date(subGame.end_time! * 1000);
      const day = dayNames[date.getUTCDay()];
      const hourOfDay = date.getHours();
      const win =
        subGame.black!.username === username && subGame.black!.result === "win"
          ? true
          : subGame.white!.username === username &&
            subGame.white!.result === "win"
          ? true
          : false;

      const gameObj: GameData = {
        UTCTime: subGame.end_time!,
        dayOfWeek: day,
        timeOfDay: hourOfDay,
        win: win,
        id: subGame.url!,
      };

      return gameObj;
    });
  });
  return allGameData.flat();
};

const getArchives = async (): Promise<string[]> => {
  const archiveResponse = await fetch(
    "https://api.chess.com/pub/player/dippyville/games/archives"
  );
  const archiveData = await archiveResponse.json();
  return archiveData.archives;
};

const processData = (games: GameData[]) => {
  interface DailyData {
    Monday: {
      losses: number;
      wins: number;
    };
    Tuesday: {
      losses: number;
      wins: number;
    };
    Wednesday: {
      losses: number;
      wins: number;
    };
    Thursday: {
      losses: number;
      wins: number;
    };
    Friday: {
      losses: number;
      wins: number;
    };
    Saturday: {
      losses: number;
      wins: number;
    };
    Sunday: {
      losses: number;
      wins: number;
    };
  }
  const dailyRatio: DailyData = {
    Monday: { losses: 0, wins: 0 },
    Tuesday: { losses: 0, wins: 0 },
    Wednesday: { losses: 0, wins: 0 },
    Thursday: { losses: 0, wins: 0 },
    Friday: { losses: 0, wins: 0 },
    Saturday: { losses: 0, wins: 0 },
    Sunday: { losses: 0, wins: 0 },
  };

  games.forEach((game) => {
    if (game.win) dailyRatio[game.dayOfWeek as keyof DailyData].wins += 1;
    else dailyRatio[game.dayOfWeek as keyof DailyData].losses += 1;
  });

  createChart(dailyRatio);
};

const handleFormSubmit = async (e: SubmitEvent) => {
  console.log("logging");
  e.preventDefault();
  //1. Check if user exists
  checkUserExists();
  const gamesArchives = await getArchives();
  const allGames = await getAllGames(gamesArchives);
  const processedData = processData(allGames);
};

form.addEventListener("submit", handleFormSubmit);
