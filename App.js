import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import GroupTest from "./src/Screens/GroupTest";
import GroupTestScreen from "./src/Screens/GroupTestScreen";

const Stack = createNativeStackNavigator();
// fjdbkjvbksjbfvkjb
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Горим сонгох">
        <Stack.Screen name="Горим сонгох" component={HomeScreen} />
        <Stack.Screen name="Бүлэг сонгох" component={GroupTestScreen} />
        <Stack.Screen name="Тест өгөх" component={GroupTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
