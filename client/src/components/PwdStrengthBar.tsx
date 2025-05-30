export const PwdStrengthBar = ({ score }: { score: number }) => {
  const getColor = () => {
    switch (score) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-400";
      case 3:
        return "bg-yellow-400";
      case 4:
        return "bg-yellow-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getLabel = () => {
    switch (score) {
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Fair";
      case 4:
        return "Good";
      case 5:
        return "Strong";
      default:
        return "Poor";
    }
  };

  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded bg-gray-200 bg-oran">
        <div
          className={`h-full rounded transition-all duration-300 ${getColor()}`}
          style={{ width: `${(score / 5) * 100}%` }}
        ></div>
      </div>
      {<p className="text-sm mt-1 font-medium text-gray-600">{getLabel()}</p>}
    </div>
  );
};
