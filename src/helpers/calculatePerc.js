// TERRIBLE - REFACTOR
export const calculatePercentage = (partsx, partsy) => {
  const total = partsx + partsy;
  return ((partsx / total) * 100).toFixed(2);
};
