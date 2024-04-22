import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import TestingAnswers from "../Components/TestingAnswers";

function GroupTest(props) {
  const [data, setData] = useState([]);
  const [duudsanAsuult, setDuudsanAsuult] = useState(0);
  const [hariultTugjsen, setHariultTugjsen] = useState(false);
  const [ViewColor, setViewColor] = useState("black"); // Default to white
  const [TextColor, setTextColor] = useState("black"); // Default to white
  const [filterImage, setFilterImage] = useState("s1a8.jpg");
  const [allImages, setAllImages] = useState({});
  const idBuleg = props.bulegid;
  const [tugjee, setTugjee] = useState(false);
  const [songolt, setSongolt] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://10.150.43.202:3000/asuult/buleg/${idBuleg}`
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
    if (duudsanAsuult < data.length - 1) {
      setDuudsanAsuult(duudsanAsuult + 1);
      setHariultTugjsen(false);
      setSongolt(null);
    }
  };

  useEffect(() => {
    const importAll = (r) => {
      let images = {};
      r.keys().map((item, index) => {
        images[item.replace("./", "")] = r(item);
        setAllImages(images);
      });
      return images;
    };

    const images = importAll(
      require.context("../Images/image", false, /\.(png|jpe?g|svg)$/)
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.questionNumber, { color: TextColor }]}>
          {duudsanAsuult + 1} / {data.length}
        </Text>
        <View style={styles.imageContainer}>
          {Object.keys(allImages).map((imageName, index) => {
            if (imageName === data[duudsanAsuult]?.image + ".jpg") {
              console.log(data[duudsanAsuult]?.image + ".jpg");
              return (
                <Image
                  key={index}
                  source={allImages[data[duudsanAsuult]?.image + ".jpg"]}
                  style={styles.image}
                />
              );
            }
          })}
        </View>
        <Text style={styles.questionText}>{data[duudsanAsuult]?.asuult}</Text>

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
          
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 600,
    height: 400,
    resizeMode: "contain",
  },
  questionNumber: {
    fontSize: 20,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default GroupTest;
