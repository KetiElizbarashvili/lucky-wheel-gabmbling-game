export const segments = [
    { label: "$2", color: "bg-pink-100", weight: 1 },
    { label: "$4", color: "bg-pink-200", weight: 1 },
    { label: "$8", color: "bg-pink-300", weight: 1 },
    { label: "$16", color: "bg-pink-400", weight: 1 },
    { label: "$32", color: "bg-pink-300", weight: 1 },
    { label: "$64", color: "bg-pink-200", weight: 1 },
    { label: "$128", color: "bg-pink-100", weight: 1 },
    { label: "Lose", color: "bg-pink-400", weight: 1 },
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
  