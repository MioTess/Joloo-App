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
          `http://${props.internetPro}/asuult/buleg/${idBuleg}`
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
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <View style={styles.header}>
        <View style={styles.asuultiinTooView}>
          <Text style={[styles.asuultiinTooText, { color: TextColor }]}>
            {duudsanAsuult + 1} / {data.length}
          </Text>
        </View>
        <View style={styles.asuultView}>
          <ScrollView>
            <Text style={styles.asuult}>{data[duudsanAsuult]?.asuult}</Text>
          </ScrollView>
        </View>
      </View>

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

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.asuultOutside}>
          <View style={styles.asuultiinHariult}>
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
              internetPro={props.internetPro}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "25%",
    backgroundColor: "#F4D03F",
    flexDirection: "column",
  },
  asuultiinTooView: {
    flexDirection: "row",
    margin: 8,
  },
  asuultiinTooText: {
    color: "gray",
    fontSize: 20,
    opacity: 0.6,
  },
  asuultView: { alignItems: "center", padding: 20, flex: 1, marginBottom: 15 },
  asuult: {
    flex: 1,
    fontSize: 19,
    marginTop: 10,
    marginBottom: 10,
    color: "#2C3E50",
  },
  imageContainer: {
    height: "25%",
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#273746",
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 6,
    borderColor: "#F4D03F",
    borderWidth: 0.8,
  },

  asuultOutside: {
    flex: 2,
    width: "90%",
    marginTop: 20,
  },
  asuultiinHariult: {
    marginTop: 2,
    borderBlockColor: "black",
    borderWidth: 0.1,
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: { width: 15, height: 25 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 1,
    width: "100%",
    padding: 15,
    backgroundColor: "#273746",
  },
  //
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
