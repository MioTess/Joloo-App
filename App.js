import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import GroupTest from "./src/Screens/GroupTest";
import GroupTestScreen from "./src/Screens/GroupTestScreen";
import RandomTest20 from "./src/Screens/RandomTest20";
import ImgTst from "./src/Components/ImgTst";

const Stack = createNativeStackNavigator();
// fjdbkjvbksjbfvkjb
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Горим сонгох">
        <Stack.Screen name="Горим сонгох" component={HomeScreen} />
        <Stack.Screen name="Бүлэг сонгох" component={GroupTestScreen} />
        <Stack.Screen name="Тест өгөх" component={GroupTest} />
        <Stack.Screen name="Шалгалт эхлэх" component={RandomTest20} />
        <Stack.Screen name="Зураг" component={ImgTst} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
