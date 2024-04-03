import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function TypeButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#36B6DE",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 250,
    margin: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});

export default TypeButton;
