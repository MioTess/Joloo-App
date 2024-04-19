import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import GroupTestAnswers from "../Components/GroupTestAnswers";

const RandomTest20 = (props) => {
  const [data, setData] = useState([]);
  const [duudsanAsuult, setDuudsanAsuult] = useState(0);
  const [songoltHiisen, setSongoltHiisen] = useState(null);
  const [tugjee, setTugjee] = useState(false);
  const [ViewColor, setViewColor] = useState("black");
  const [TextColor, setTextColor] = useState("black");
  const [filterImage, setFilterImage] = useState("s1a8.jpg");
  const [allImages, setAllImages] = useState({});
  const [songolt, setSongolt] = useState(null);
  const idBuleg = props.bulegid;

  useEffect(() => {
    if (duudsanAsuult >= 19) {
      setViewColor("transparent");
      setTextColor("transparent");
    }
  }, [duudsanAsuult]);

  const asuultSolih = () => {
    setDuudsanAsuult(duudsanAsuult + 1);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://192.168.1.80:3000/asuult/random/7");

        setData(res.data.data);
        // console.log(res.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // IMPORT IMAGE FOR DATA
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.view, { backgroundColor: { ViewColor } }]}>
          <Text style={[styles.secondText, { color: TextColor }]}>
            {duudsanAsuult + 1}
          </Text>
          <Text style={[styles.text, { color: TextColor }]}>
            / {data.length}
          </Text>
        </View>

        {/* IMAGE LOAD FROM DATA */}

        <View style={styles.imageContainer}>
          {Object.keys(allImages).map((imageName, index) => {
            if (imageName == data[duudsanAsuult]?.image + ".jpg") {
              console.log(
                "allImageName : " +
                  imageName +
                  "filterImageName : " +
                  filterImage
              );
              console.log();
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

        <Text style={[styles.asuult, { color: TextColor }]}>
          {data[duudsanAsuult]?.asuult}
        </Text>

        <GroupTestAnswers
          duudsanAsuult={duudsanAsuult}
          data={data}
          // hariultShalgah={hariultShalgah}
          songoltHiisen={songoltHiisen}
          tugjee={tugjee}
          setDuudsanAsuult={setDuudsanAsuult}
          asuultSolih={asuultSolih}
          setSongolt={setSongolt}
          setTextColor={setTextColor}
          setViewColor={setViewColor}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view: { flexDirection: "row", alignItems: "flex-end" },
  text: {
    color: "gray",
    fontSize: 20,
    opacity: 0.6,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  asuult: { fontSize: 16, marginTop: 10 },
  secondText: {
    color: "gray",
    fontSize: 20,
    opacity: 0.6,
    marginRight: 2,
  },
});
export default RandomTest20;
