import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Refridge-Alert">
        <Stack.Screen name="Refridge-Alert" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
