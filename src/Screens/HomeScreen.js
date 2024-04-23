import React, { useState } from "react";
import TypeButton from "../Components/TypeButton";
import { View, StyleSheet, SafeAreaView, Image, Text } from "react-native";
import carImage from "../Data/HomeScreenCar.jpg";

function HomeScreen(props) {
  const [internetPro, setInternetPro] = useState("10.150.48.92");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.imageStyles} source={carImage}></Image>
        <Text style={styles.textStyle}>Жолооны шалгалт</Text>
      </View>
      <View style={styles.buttonContainer}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#2C3E50",
  },
  textStyle: {
    fontSize: 36,
    marginTop: 25,
    shadowColor: "#17202A",
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 6,
    color: '#17202A'
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "brown",
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 6,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyles: {
    borderRadius: 20,
    height: 200,
    width: 370,
  },
});

export default HomeScreen;
