import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios"; // Import axios

function GroupTestAnswers({
  data,
  duudsanAsuult,
  zuwHariult,
  songoltHiisen,
  tugjee,
}) {
  const [hariultData, setHariultData] = useState(null);

  useEffect(() => {
    fetchAnswers(data, duudsanAsuult); // Call fetchAnswers within useEffect
  }, [data, duudsanAsuult]); // Dependency array to trigger useEffect on data or duudsanAsuult change

  const fetchAnswers = async (data, duudsanAsuult) => {
    try {
      console.log(data);
      const res = await axios.get(
        `http://172.20.10.2:3000/hariult/asuult/7${data[duudsanAsuult]?.asuult_id}`
      ); // Fix typo and URL
      setHariultData(res.data.data);
      console.log(res.data.data); // Removed "Hello" from console.log
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Display hariultData or loading indicator */}
      {hariultData ? <Text>{hariultData}</Text> : <Text>Loading...</Text>}
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
