import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function GroupTestAnswers({
  data,
  duudsanAsuult,
  hariultShalgah,
  zuwHariult,
  songoltHiisen,
  tugjee,
}) {
  return (
    <View style={styles.container}>
      {data[duudsanAsuult]?.hariult.map((hariult, index) => (
        <TouchableOpacity
          onPress={() => hariultShalgah(hariult)}
          disabled={tugjee}
          key={index}
          style={styles.answerButton}
          activeOpacity={0.7} // Add a slight opacity effect when pressed
        >
          <Text style={styles.answerText}>{hariult}</Text>

          {hariult == zuwHariult ? (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 30 / 2,
                backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="check"
                style={{ color: "white", fontSize: 20 }}
              />
            </View>
          ) : hariult == songoltHiisen ? (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 30 / 2,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="close"
                style={{ color: "white", fontSize: 20 }}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  answerButton: {
    paddingVertical: 12,
    marginVertical: 5,
    backgroundColor: "lightgray",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "lightgray", // Set border color to match background
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  answerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default GroupTestAnswers;
