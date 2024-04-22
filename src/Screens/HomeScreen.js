import React, { useState } from "react";
import TypeButton from "../Components/TypeButton";
import { View, StyleSheet, SafeAreaView } from "react-native";

function HomeScreen(props) {
  const [internetPro, setInternetPro] = useState("10.150.48.92");
  return (
    <SafeAreaView style={styles.container}>
      <TypeButton
        title="Шалгалт эхлэх"
        onPress={() => {
          props.navigation.navigate("Шалгалт эхлэх");
        }}
      />
      <TypeButton
        title="Бүлэг сонгох"
        onPress={() => {
          props.navigation.navigate("Бүлэг сонгох");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
