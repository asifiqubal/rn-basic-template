import { ComponentType } from "react";

export type Route<T, P = any> = {
  name: keyof T;
  component: ComponentType<P>;
  options?: P;
  screenType?: "stack" | "modal";
  initialParams?: any;
  icon?: string;
};

export type AppNavigatorProps = {
  initialRouteName?: string;
};

export type MainStackPramList = {
  Home: undefined;
  Profile: undefined;
};

export type MainRoutes = Record<
  keyof MainStackPramList,
  Route<MainStackPramList>
>;

export type NavigationParamList = MainStackPramList; //if you had more you can add the by `&`
