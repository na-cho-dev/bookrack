import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { useUserStore } from "./stores/useUserStore";
import { LucideLoaderCircle } from "lucide-react";

const App = () => {
  useCurrentUser(); // loads user on app start
  const loadingUser = useUserStore((state) => state.loadingUser);

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LucideLoaderCircle className="animate-spin w-16 h-16 text-sec" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
};

export default App;
