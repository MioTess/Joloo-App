import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import axios from "axios";
import TestingAnswers from "../Components/TestingAnswers";

function GroupTest(props) {
  const [data, setData] = useState([]);
  const [duudsanAsuult, setDuudsanAsuult] = useState(0);
  const [hariultTugjsen, setHariultTugjsen] = useState(false);
  const [ViewColor, setViewColor] = useState("black"); // Default to white
  const [TextColor, setTextColor] = useState("black"); // Default to white
  const idBuleg = props.bulegid;
  const [tugjee, setTugjee] = useState(false);
  const [songolt, setSongolt] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://172.20.10.2:3000/asuult/buleg/${idBuleg}`
        );
        setData(res.data.data);
      } catch (error) {
        console.log("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();
  }, [idBuleg]);

  useEffect(() => {
    if (duudsanAsuult > 9) {
      setViewColor("transparent");
      setTextColor("transparent");
    }
  }, [duudsanAsuult]);

  const asuultSolih = () => {
    setDuudsanAsuult(duudsanAsuult + 1);
  };

  const handleNextClick = () => {
    if (duudsanAsuult <= data.length) {
      setDuudsanAsuult(duudsanAsuult + 1);
      setHariultTugjsen(false);
      setSongolt(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.questionFrame, { borderColor: ViewColor }]}>
        <Text style={[styles.questionNumber, { color: TextColor }]}>
          {duudsanAsuult + 1} / {data.length}
        </Text>
        <Text style={styles.questionText}>{data[duudsanAsuult]?.asuult}</Text>
      </View>
      <TestingAnswers
        duudsanAsuult={duudsanAsuult}
        data={data}
        tugjee={tugjee}
        setDuudsanAsuult={setDuudsanAsuult}
        asuultSolih={asuultSolih} 
        hariultTugjsen={hariultTugjsen}
        setHariultTugjsen={setHariultTugjsen}
        handleNextClick={handleNextClick}
        songolt={songolt}
        setSongolt={setSongolt}
        setTextColor={setTextColor}
        navigate={props.navigate}
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
});

export default GroupTest;
