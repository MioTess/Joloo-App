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
  internetPro,
  navigation, // Add navigation prop
}) {
  const initialState = {
    hariultData: [],
    loading: true,
    zuwHariult: "",
    onoo: 0,
    isModalVisible: false,
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(initialState);
  const [mNavigate, setNavigate] = useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `http://${internetPro}/hariult/asuult/${data[duudsanAsuult]?.asuult_id}`
        );
        setState((prevState) => ({
          ...prevState,
          hariultData: response.data.data,
          loading: false,
        }));
        const correctAnswer = response.data.data.find(
          (answer) => answer.is_right_choices === 1
        );
        if (correctAnswer) {
          setState((prevState) => ({
            ...prevState,
            zuwHariult: correctAnswer,
          }));
        }
      } catch (error) {
        console.log("Error fetching answers:", error.message);
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    fetchAnswers();
  }, [data, duudsanAsuult]);

  const onooNemeh = (clickHariultID) => {
    if (clickHariultID === state.zuwHariult.hariult_id) {
      setState((prevState) => ({
        ...prevState,
        onoo: prevState.onoo + 1,
      }));
    }
  };

  const resetState = () => {
    setState(initialState);
  };

  const ilgeehTowch = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        {console.log(duudsanAsuult)}
        <Text style={styles.buttonText}>Илгээх</Text>
      </TouchableOpacity>
    );
  };

  const test = () => {
    return state.loading ? (
      <ActivityIndicator size="large" color="blue" />
    ) : (
      <>
        {state.hariultData.map((answer) => (
          <TouchableOpacity
            onPress={() => {
              onooNemeh(answer.hariult_id);
              asuultSolih();
            }}
            key={answer.hariult_id}
            style={styles.answerButton}
          >
            {console.log(duudsanAsuult)}
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
        onRequestClose={() =>
          setState((prevState) => ({ ...prevState }, setModalVisible(false)))
        }
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
              {state.onoo > 18 ? "Тэнцлээ" : "Тэнцсэнгүй"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text  style={{ fontSize: 30, fontWeight: "bold", color: "red" }}> {state.onoo} / 20</Text>
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
    borderColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  answerText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2C3E50",
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

    marginHorizontal: 5,
    marginTop: 15,
    borderRadius: 50,
    borderWidth: 0.1,
    borderColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default GroupTestAnswers;
