import React, { useEffect, useState } from "react";
import TypeButton from "../Components/TypeButton";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function TestingAnswers({
  data,
  duudsanAsuult,
  songoltHiisen,
  setDuudsanAsuult,
  tugjee,
  asuultSolih,
  hariultTugjsen,
  setHariultTugjsen,
  handleNextClick,
  songolt,
  setSongolt,
  setTextColor,
  navigate,
}) {
  const [hariultData, setHariultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zuwHariult, setZuwHariult] = useState("");
  const [zuwHariultEseh, setZuwHariultEseh] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [onoo, setOnoo] = useState(0);
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
      setZuwHariultEseh(zuwHariult);
    }
  };
  const seeZuwHariult = () => {
    <View style={styles.correctAnswer}>
      <Text style={styles.correctAnswerText}>
        Correct Answer: {zuwHariult.hariult} Total score : {onoo}
      </Text>
    </View>;
  };

  const buttonSee = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNextClick}>
          <Text style={styles.buttonText}>Дараах</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ilgeehTowch = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
          setTextColor("black");
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
            disabled={hariultTugjsen}
            onPress={() => {
              onooNemeh(answer.hariult_id);
              setSongolt(answer);
              setHariultTugjsen(true);
            }}
            key={answer.hariult_id}
            style={styles.answerButton}
          >
            <Text style={styles.answerText}>{answer.hariult}</Text>

            {answer == zuwHariultEseh ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="check"
                  style={{
                    color: "white",
                    fontSize: 20,
                  }}
                />
              </View>
            ) : answer == songolt ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  style={{
                    color: "white",
                    fontSize: 20,
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
        {seeZuwHariult()}

        {songolt !== null ? buttonSee() : null}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {duudsanAsuult > 19 ? ilgeehTowch() : test()}

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
              <Text>/ 20</Text>
            </View>
          </View>
          <TypeButton
            title="Дахин эхлэх"
            onPress={() => {
              navigate("Бүлэг сонгох");
            }}
          />
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
  },
});

export default TestingAnswers;
