import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

function TestingAnswers({
  data,
  duudsanAsuult,
  songoltHiisen,
  setDuudsanAsuult,
  tugjee,
  asuultSolih,
}) {
  const [hariultData, setHariultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zuwHariult, setZuwHariult] = useState("");
  const [onoo, setOnoo] = useState(0);

  useEffect(() => { 
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.14:3000/hariult/asuult/${data[duudsanAsuult]?.asuult_id}`
        );
        setHariultData(response.data.data);
        const correctAnswer = response.data.data.find(
          (answer) => answer.is_right_choices === 1
        );
        if (correctAnswer) {
          setZuwHariult(correctAnswer);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error fetching answers:", error.message);
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [data, duudsanAsuult]);

  const onooNemeh = (clickHariultID) => {
    if (clickHariultID === zuwHariult.hariult_id) {
      setOnoo(onoo + 1);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          {hariultData.map((answer) => (
            <TouchableOpacity
              onPress={() => {
                asuultSolih();
                onooNemeh(answer.hariult_id);
              }}
              key={answer.hariult_id}
              style={styles.answerButton}
            >
              <Text style={styles.answerText}>{answer.hariult}</Text>
            </TouchableOpacity>
          ))}
          {zuwHariult && (
            <View style={styles.correctAnswer}>
              <Text style={styles.correctAnswerText}>
                Correct Answer: {zuwHariult.hariult} Total score : {onoo}
              </Text>
            </View>
          )}
        </>
      )}
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
    borderColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  answerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  correctAnswer: {
    marginTop: 20,
    alignItems: "center",
  },
  correctAnswerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});

export default TestingAnswers;
