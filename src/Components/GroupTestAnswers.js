import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";

function GroupTestAnswers({
  data,
  duudsanAsuult,
  songoltHiisen,
  setDuudsanAsuult,
  tugjee,
  asuultSolih,
  setSongolt,
  setTextColor,
  setViewColor,
}) {
  const [hariultData, setHariultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zuwHariult, setZuwHariult] = useState("");
  const [onoo, setOnoo] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.2:3000/hariult/asuult/${data[duudsanAsuult]?.asuult_id}`
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

  const ilgeehTowch = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Илгээх</Text>
      </TouchableOpacity>
    );
  };

  const test = () => {
    return loading ? (
      <ActivityIndicator size="large" color="blue" />
    ) : (
      <>
        {hariultData.map((answer) => (
          <TouchableOpacity
            onPress={() => {
              onooNemeh(answer.hariult_id);
              asuultSolih();
            }}
            key={answer.hariult_id}
            style={styles.answerButton}
          >
            <Text style={styles.answerText}>{answer.hariult}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {duudsanAsuult >= 19 ? ilgeehTowch() : test()}

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "lightblue",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "90%",
              borderRadius: "20",
              padding: "20",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {" "}
              {onoo > 18 ? "Тэнцлээ" : "Тэнцсэнгүй"}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text> {onoo}/ 20</Text>
            </View>
          </View>
        </View>
      </Modal>
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
  button: {
    backgroundColor: "#841584",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default GroupTestAnswers;
