import React, { useState, useEffect } from "react";
import { Button, Text, View, SafeAreaView } from "react-native";
import axios from "axios";
import GroupTestAnswers from "../Components/GroupTestAnswers";

const RandomTest20 = () => {
  const [data, setData] = useState([]);
  const [duudsanAsuult, setDuudsanAsuult] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "http://10.150.43.202:3000/asuult/random/7"
        );
        setData(res.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text
          style={{
            color: "gray",
            fontSize: 20,
            opacity: 0.6,
            marginRight: 2,
          }}
        >
          {duudsanAsuult + 1}
        </Text>
        <Text style={{ color: "gray", fontSize: 20, opacity: 0.6 }}>
          / {data.length}
        </Text>
      </View>
      <Text style={{ fontSize: 22, marginTop: 10 }}>
        {data[duudsanAsuult]?.asuult}
      </Text>
      <GroupTestAnswers
        duudsanAsuult={duudsanAsuult}
        data={data}
        hariultShalgah={hariultShalgah}
        zuwHariult={zuwHariult}
        songoltHiisen={songoltHiisen}
        tugjee={tugjee}
      />
    </SafeAreaView>
  );
};

export default RandomTest20;
