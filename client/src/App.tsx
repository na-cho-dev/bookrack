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
        <div
          className="min-h-screen flex flex-col gap-4 items-center justify-center bg-bg"
          role="status"
        >
          <LoaderPinwheelIcon className="animate-spin w-10 h-10 text-sec" />
          <span className="text-sm text-tsec">Opening your library…</span>
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
