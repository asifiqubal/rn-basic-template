import { Home } from "@/app/screens/Home";
import { Profile } from "@/app/screens/Profile";
import { MainRoutes } from "../types";

export const MAIN_ROUTES: MainRoutes = {
  Home: {
    component: Home,
    name: "Home",
  },
  Profile: {
    name: "Profile",
    component: Profile,
  },
};
