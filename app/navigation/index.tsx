import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { MAIN_ROUTES } from "./routes";
import { AppNavigatorProps, NavigationParamList } from "./types";

const { Screen, Navigator, Group } =
  createNativeStackNavigator<NavigationParamList>();

const mainScreens = Object.values(MAIN_ROUTES).map((route) => (
  <Screen key={route.name} {...route} />
));
export const AppNavigation: FC<AppNavigatorProps> = () => {
  const isLoggedIn = true;

  return (
    <Navigator>
      <Group>{mainScreens}</Group>
    </Navigator>
  );
};
