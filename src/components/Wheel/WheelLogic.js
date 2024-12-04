export const segments = [
  { label: "x2", weight: 10, color: "#ddd6fe" },
  { label: "x5", weight: 5, color: "#f9a8d4" },
  { label: "Lose", weight: 50, color: "#fae8ff" },
  { label: "x10", weight: 2, color: "#fbcfe8" },
];

export const spinAPI = async (bet) => {
  if (bet <= 0) {
    throw new Error("Bet must be positive");
  }

  const cumulativeWeights = segments.map(((sum) => (seg) => (sum += seg.weight))(0));

  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomValue = (array[0] / (0xffffffff + 1)) * cumulativeWeights[cumulativeWeights.length - 1];

  const selectedIndex = cumulativeWeights.findIndex((cw) => randomValue < cw);
  const result = segments[selectedIndex];
  const winnings = result.label === "Lose" ? 0 : bet * parseInt(result.label.replace("x", ""), 10);

  return { result: result.label, winnings };
};
 