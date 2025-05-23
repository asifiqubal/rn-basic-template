import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppNavigation } from "./navigation";

export const App = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};
