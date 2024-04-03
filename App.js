import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import GroupTest from "./src/Screens/GroupTest";
import GroupTestScreen from "./src/Screens/GroupTestScreen";

const Stack = createNativeStackNavigator();
<<<<<<< HEAD
// Gantsetseg
=======
//Bolormaa
>>>>>>> 082d2738cfa7e4fc72750f4823775a19f1a7afa2
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Горим сонгох">
        <Stack.Screen name="Горм сонгох" component={HomeScreen} />
        <Stack.Screen name="Бүлэг сонгох" component={GroupTestScreen} />
        <Stack.Screen name="Тест өгөх" component={GroupTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
