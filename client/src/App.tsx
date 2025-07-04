import AppInitializer from "./components/layout/AppInitializaer";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { LoaderPinwheelIcon } from "lucide-react";
import { useAppLoading } from "./hooks/useAppLoading";

const App = () => {
  const { isAppLoading } = useAppLoading();

  return (
    <>
      <AppInitializer />

      {isAppLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <LoaderPinwheelIcon className="animate-spin w-16 h-16 text-sec" />
        </div>
      ) : (
        <>
          <Navbar />
          <AppRoutes />
        </>
      )}
    </>
  );
};

export default App;
