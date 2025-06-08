interface StatCardProps {
  label: string;
  value: number;
  icon?: React.ReactNode; // Optional: You can pass an icon for more visual cue
  color?: string; // Optional: Tailwind color class (e.g., text-sec)
}

const StatCard = ({
  label,
  value,
  icon,
  color = "text-sec",
}: StatCardProps) => (
  <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 flex items-center gap-4">
    {icon && <div className="text-3xl">{icon}</div>}
    <div>
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  </div>
);

export default StatCard;
