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
import url from "../Data/url";

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
  const [internetPro, setInternetPro] = useState(url);

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
        console.log(internetPro);
        const res = await axios.get(`http://${internetPro}/asuult/random/7`);
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
    <SafeAreaView
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#2C3E50" }}
    >
      <View style={styles.header}>
        <View style={styles.asuultiinTooView}>
          <Text style={[styles.secondText, { color: TextColor }]}>
            {duudsanAsuult + 1}
          </Text>
          <Text style={[styles.asuultiinTooText, { color: TextColor }]}>
            / {data.length}
          </Text>
        </View>
        <View style={styles.asuultView}>
          <ScrollView>
            <Text style={styles.asuult}>{data[duudsanAsuult]?.asuult}</Text>
          </ScrollView>
        </View>
      </View>

      {/* IMAGE LOAD FROM DATA */}

      <View style={styles.imageContainer}>
        {Object.keys(allImages).map((imageName, index) => {
          if (imageName == data[duudsanAsuult]?.image + ".jpg") {
            console.log(
              "allImageName : " + imageName + "filterImageName : " + filterImage
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

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.asuultOutside}>
          <View style={styles.asuultiinHariult}>
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
              internetPro={internetPro}
              navigation={props.navigation}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  asuult: {
    flex: 1,
    fontSize: 19,
    marginTop: 10,
    marginBottom: 10,
    color: "#2C3E50",
  },
  asuultView: { alignItems: "center", padding: 20, flex: 1, marginBottom: 15 },

  imageContainer: {
    height: 200, // Specify a fixed height
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
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }, 
  secondText: {
    color: "gray",
    fontSize: 20,
    opacity: 0.6,
    marginRight: 2,
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
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default RandomTest20;
