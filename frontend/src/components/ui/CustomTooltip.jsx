export default function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const { weight, weightedAt } = payload[0].payload;
    const weightedAtMap = {
      morning: "Rano",
      afternoon: "Popołudniu",
      evening: "Wieczorem",
    };

    return (
      <div className="bg-white border border-gray-200 shadow-md rounded-md p-2 text-sm">
        <p className="font-medium">Data: {label}</p>
        <p>Waga: {weight} kg</p>
        <p>Pora ważenia: {weightedAtMap[weightedAt] || weightedAt}</p>
      </div>
    );
  }

  return null;
}
