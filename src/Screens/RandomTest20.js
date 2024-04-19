import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
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
        const res = await axios.get("http://172.20.10.2:3000/asuult/random/7");

        setData(res.data.data);
        console.log(res.data.data);
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
      <View style={[styles.view, { backgroundColor: { ViewColor } }]}>
        <Text style={[styles.secondText, { color: TextColor }]}>
          {duudsanAsuult + 1}
        </Text>
        <Text style={[styles.text, { color: TextColor }]}>/ {data.length}</Text>
      </View>

      {/* IMAGE LOAD FROM DATA */}

      <View>
        {Object.keys(allImages).map((imageName, index) => {
          if (imageName == filterImage) {
            console.log(
              "allImageName : " + imageName + "filterImageName : " + filterImage
            );
            return <Image key={index} source={allImages[imageName]} />;
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: { flexDirection: "row", alignItems: "flex-end" },
  text: {
    color: "gray",
    fontSize: 20,
    opacity: 0.6,
  },
  asuult: { fontSize: 22, marginTop: 10 },
  secondText: {
    color: "gray",
    fontSize: 20,
    opacity: 0.6,
    marginRight: 2,
  },
});
export default RandomTest20;
