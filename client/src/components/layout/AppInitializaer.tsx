import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useLoadMemberships } from "../../hooks/useLoadMemberships";

const AppInitializer = () => {
  useCurrentUser();
  useLoadMemberships();

  return null;
};

export default AppInitializer;
