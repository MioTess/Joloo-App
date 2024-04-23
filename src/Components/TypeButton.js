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
    backgroundColor: "#F4D03F",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 250,
    margin: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: "blue",
    padding: 15,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.65,
    elevation: 6,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2C3E50",
    textTransform: "uppercase",
  },
});

export default TypeButton;
