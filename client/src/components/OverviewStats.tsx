import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { BookOpen, CheckCircle, Clock, Archive } from "lucide-react";

interface Stats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  pendingRequests: number;
}

const OverviewStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    pendingRequests: 0,
  });

  //   useEffect(() => {
  //     const fetchStats = async () => {
  //       try {
  //         const res = await axiosInstance.get("/admin/stats");
  //         setStats(res.data);
  //       } catch (err) {
  //         console.error("Failed to fetch stats:", err);
  //       }
  //     };

  //     fetchStats();
  //   }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Books"
        value={stats.totalBooks}
        icon={<BookOpen />}
      />
      <StatCard
        label="Available"
        value={stats.availableBooks}
        icon={<CheckCircle />}
      />
      <StatCard
        label="Borrowed"
        value={stats.borrowedBooks}
        icon={<Archive />}
      />
      <StatCard
        label="Pending Requests"
        value={stats.pendingRequests}
        icon={<Clock />}
      />
    </div>
  );
};

export default OverviewStats;
