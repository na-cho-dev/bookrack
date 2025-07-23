import { useCurrentUser } from "../../hooks/useUser";
import { useLoadMemberships } from "../../hooks/useMembership";

const AppInitializer = () => {
  useCurrentUser();
  useLoadMemberships();

  return null;
};

export default AppInitializer;
