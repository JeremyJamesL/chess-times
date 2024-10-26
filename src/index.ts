const app = document.querySelector("#app");
const form = document.querySelector("#form")! as HTMLInputElement;
const formInput = document.querySelector("#forminput")! as HTMLInputElement;
const username = document.querySelector("#username")!;
const ctx = document.getElementById("myChart");
let baseURL = `https://api.chess.com/pub/player`;
let playerName = "";

const checkUserExists = async (): Promise<void | boolean> => {
  const userExistsRes = await fetch(`${baseURL}/${formInput.value}`);
  const userExistsData = await userExistsRes.json();

  if (userExistsData.code === 0) {
    console.log("doesn't existys");
    formInput.classList.add("border-2", "border-red-500");
    return;
  }

  formInput.classList.remove("border-2", "border-red-500");
  app?.classList.remove("hidden");
  playerName = formInput.value;
  username.textContent = playerName;
};

const handleFormSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  console.log(formInput.value);
  //1. Check if user exists
  checkUserExists();
};

form.addEventListener("submit", handleFormSubmit);

// new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: "% of wins",
//         data: [50, 20, 60, 50, 70, 35, 47],
//         borderWidth: 1,
//         backgroundColor: "#0033a0",
//       },
//       {
//         label: "% of losses",
//         data: [50, 80, 40, 50, 30, 65, 53],
//         borderWidth: 1,
//         backgroundColor: "#b2b2b2",
//       },
//     ],
//   },
//   options: {
//     indexAxis: "y",
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true,
//       },
//     },
//   },
// });

// const form = document.getElementById("form")! as HTMLInputElement;
// const input = document.getElementById("input")! as HTMLInputElement;
// const ctx = document.getElementById("myChart");
// const username = "Dippyville";
// const dayNames = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// // Returned from API
// interface FullSubGame {
//   end_time: number;
//   black: { username: string; result: string };
//   white: { username: string; result: string };
//   url: string;
// }

// // Returned from allGameData function
// interface GameData {
//   UTCTime: number;
//   dayOfWeek: string;
//   timeOfDay: number; // 24 hr format
//   win: boolean;
//   readonly id: string;
// }

// const getAllGames = async (endpoints: string[]) => {
//   const fetchPromises = endpoints.map((endpoint) =>
//     fetch(endpoint).then((response) => {
//       if (!response.ok) {
//         throw new Error("error");
//       }
//       return response.json();
//     })
//   );

//   const results = await Promise.all(fetchPromises);

//   // Process the games into GameData interface
//   const allGameData = results.map((game) => {
//     return game.games.map((subGame: Partial<FullSubGame>) => {
//       const date = new Date(subGame.end_time! * 1000);
//       const day = dayNames[date.getUTCDay()];
//       const hourOfDay = date.getHours();
//       const win =
//         subGame.black!.username === username && subGame.black!.result === "win"
//           ? true
//           : subGame.white!.username === username &&
//             subGame.white!.result === "win"
//           ? true
//           : false;

//       const gameObj: GameData = {
//         UTCTime: subGame.end_time!,
//         dayOfWeek: day,
//         timeOfDay: hourOfDay,
//         win: win,
//         id: subGame.url!,
//       };

//       return gameObj;
//     });
//   });
//   return allGameData.flat();
// };

// const getArchives = async (): Promise<string[]> => {
//   const archiveResponse = await fetch(
//     "https://api.chess.com/pub/player/dippyville/games/archives"
//   );
//   const archiveData = await archiveResponse.json();
//   return archiveData.archives;
// };

// const processData = (games: GameData[]) => {
//   interface DailyData {
//     Monday: {
//       losses: number;
//       wins: number;
//     };
//     Tuesday: {
//       losses: number;
//       wins: number;
//     };
//     Wednesday: {
//       losses: number;
//       wins: number;
//     };
//     Thursday: {
//       losses: number;
//       wins: number;
//     };
//     Friday: {
//       losses: number;
//       wins: number;
//     };
//     Saturday: {
//       losses: number;
//       wins: number;
//     };
//     Sunday: {
//       losses: number;
//       wins: number;
//     };
//   }
//   const dailyRatio: DailyData = {
//     Monday: { losses: 0, wins: 0 },
//     Tuesday: { losses: 0, wins: 0 },
//     Wednesday: { losses: 0, wins: 0 },
//     Thursday: { losses: 0, wins: 0 },
//     Friday: { losses: 0, wins: 0 },
//     Saturday: { losses: 0, wins: 0 },
//     Sunday: { losses: 0, wins: 0 },
//   };

//   games.forEach((game) => {
//     if (game.win) dailyRatio[game.dayOfWeek as keyof DailyData].wins += 1;
//     else dailyRatio[game.dayOfWeek as keyof DailyData].losses += 1;
//   });

//   console.log(dailyRatio);

//   const calculatePercentage = (
//     isWin: boolean,
//     losses: number,
//     wins: number
//   ): string => {
//     const total = losses + wins;
//     if (isWin) {
//       return ((wins / total) * 100).toFixed(2);
//     } else {
//       return ((losses / total) * 100).toFixed(2);
//     }
//   };

//   new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
//       datasets: [
//         {
//           label: "% of wins",
//           data: [
//             calculatePercentage(
//               false,
//               dailyRatio.Monday.wins,
//               dailyRatio.Monday.losses
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Tuesday.wins,
//               dailyRatio.Tuesday.losses
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Wednesday.wins,
//               dailyRatio.Wednesday.losses
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Thursday.wins,
//               dailyRatio.Thursday.losses
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Friday.wins,
//               dailyRatio.Friday.losses
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Saturday.wins,
//               dailyRatio.Saturday.losses
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Sunday.wins,
//               dailyRatio.Sunday.losses
//             ),
//           ],
//           borderWidth: 1,
//           backgroundColor: "#0033a0",
//         },
//         {
//           label: "% of losses",
//           data: [
//             calculatePercentage(
//               false,
//               dailyRatio.Monday.losses,
//               dailyRatio.Monday.wins
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Tuesday.losses,
//               dailyRatio.Tuesday.wins
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Wednesday.losses,
//               dailyRatio.Wednesday.wins
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Thursday.losses,
//               dailyRatio.Thursday.wins
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Friday.losses,
//               dailyRatio.Friday.wins
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Saturday.losses,
//               dailyRatio.Saturday.wins
//             ),
//             calculatePercentage(
//               false,
//               dailyRatio.Sunday.losses,
//               dailyRatio.Sunday.wins
//             ),
//           ],

//           borderWidth: 1,
//           backgroundColor: "#b2b2b2",
//         },
//       ],
//     },
//     options: {
//       indexAxis: "y",

//       scales: {
//         x: {
//           stacked: true,
//         },
//         y: {
//           stacked: true,
//         },
//       },
//     },
//   });
// };

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const gamesArchives = await getArchives();
//   const allGames = await getAllGames(gamesArchives);
//   const processedData = processData(allGames);
// });
