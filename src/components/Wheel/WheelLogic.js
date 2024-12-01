export const segments = [
  { label: "2x", value: 2, weight: 1, color: "#fbcfe8" },
  { label: "4x", value: 4, weight: 1, color: "#f9a8d4" },
  { label: "Lose", value: 0, weight: 1, color: "#faf5ff" },
  { label: "8x", value: 8, weight: 1, color: "#fbcfe8" },
  { label: "16x", value: 16, weight: 1, color: "#f9a8d4" },
  { label: "Lose", value: 0, weight: 1, color: "#faf5ff" },
  { label: "32x", value: 32, weight: 1, color: "#f9a8d4" },
  { label: "Lose", value: 0, weight: 1, color: "#faf5ff" },
];

export const getRandomSegment = () => {
  const totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const segment of segments) {
    cumulativeWeight += segment.weight;
    if (random < cumulativeWeight) {
      return segment.label;
    }
  }
  return null;
};
