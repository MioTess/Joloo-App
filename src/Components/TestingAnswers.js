import React, { useEffect, useState } from "react";

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
  internetPro,
}) {
  const [hariultData, setHariultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zuwHariult, setZuwHariult] = useState("");
  const [zuwHariultEseh, setZuwHariultEseh] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [mNavigate, setNavigate] = useState(false);
  const [onoo, setOnoo] = useState(0);
  const [state, setState] = useState(initialState);

  const navigateBack = () => {
    navigate.goBack();
  };
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `http://${internetPro}/hariult/asuult/${data[duudsanAsuult]?.asuult_id}`
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
  const initialState = {
    hariultData: [],
    loading: true,
    zuwHariult: "",
    onoo: 0,
    isModalVisible: false,
  };
  const resetState = () => {
    setState(initialState);
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
      {duudsanAsuult >= 9 ? ilgeehTowch() : test()}

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#2C3E50",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#F4D03F",
              width: "90%",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
              shadowColor: "brown",
              shadowOffset: { width: 20, height: 20 },
              shadowOpacity: 0.2,
              shadowRadius: 9,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {" "}
              {onoo > 9 ? "Тэнцлээ" : "Тэнцсэнгүй"}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold", color: "red" }}>
                {" "}
                {onoo} / 10
              </Text>
            </View>
            
          </View>
          <TouchableOpacity
          style = {{
            backgroundColor: "#D4AC0D",
            borderRadius: 8,
            marginHorizontal: 5,
            marginTop: 15,
            borderRadius: 50,
            borderWidth: 0.1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
            
          }}
              onPress={() => {
                resetState();
                setModalVisible(false);
                setNavigate(true);
              }}
            >
              <Text style={{ color: "black", fontSize: 15, fontWeight : "bold" }}>Дахин эхлэх</Text>
            </TouchableOpacity>
        </View>
      </Modal>
      {mNavigate == true ? navigateBack() : null}
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
    backgroundColor: "#D4AC0D",
    borderRadius: 50,
    borderWidth: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
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
    backgroundColor: "#6b8e23",
    borderRadius: 8,
    marginHorizontal: 5,
    marginTop: 15,
    borderRadius: 50,
    borderWidth: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default TestingAnswers;
