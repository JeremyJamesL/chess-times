// TERRIBLE - REFACTOR
export const calculatePercentage = (
  isWin: boolean,
  losses: number,
  wins: number
): string => {
  const total = losses + wins;
  if (isWin) {
    return ((wins / total) * 100).toFixed(2);
  } else {
    return ((losses / total) * 100).toFixed(2);
  }
};
