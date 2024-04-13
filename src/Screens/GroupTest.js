import React, { useState, useEffect } from "react";
import { TouchableOpacity, SafeAreaView, Text, View, StyleSheet } from "react-native";
import axios from "axios";
import TestingAnswers from "../Components/TestingAnswers";
function GroupTest(props) {
  const [data, setData] = useState([]);
  const [duudsanAsuult, setDuudsanAsuult] = useState(0);
  const [songoltHiisen, setSongoltHiisen] = useState(null);
  const idBuleg = props.bulegid;
  const [tugjee, setTugjee] = useState(false);
  const asuultSolih = () => {
    setDuudsanAsuult(duudsanAsuult + 1);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://192.168.1.14:3000/asuult/buleg/${idBuleg}`);
        setData(res.data.data);
      } catch (error) {
        console.log("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();
  }, [idBuleg]);

  const handleNextClick = () => {
    if (duudsanAsuult < data.length - 1) {
      setDuudsanAsuult(duudsanAsuult + 1);
    }
  };

  const handlePrevClick = () => {
    if (duudsanAsuult > 0) {
      setDuudsanAsuult(duudsanAsuult - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.questionFrame}>

        <Text style={styles.questionNumber}>
          {duudsanAsuult + 1} / {data.length}
        </Text>
        
        <Text style={styles.questionText}>
          {data[duudsanAsuult]?.asuult}
        </Text>

      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.button} onPress={handlePrevClick}>
          <Text style={styles.buttonText}>Өмнөх</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNextClick}>
          <Text style={styles.buttonText}>Дараах</Text>
        </TouchableOpacity>

      </View>

      <TestingAnswers
        duudsanAsuult={duudsanAsuult}
        data={data}
        songoltHiisen={songoltHiisen}
        tugjee={tugjee}
        setDuudsanAsuult={setDuudsanAsuult}
        asuultSolih={asuultSolih}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionFrame: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 20,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 22,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#841584",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default GroupTest;
