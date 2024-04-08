import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import ChosenGroupQuestion from "../Data/ChosenGroupQuestion";
import GroupTestAnswers from "../Components/GroupTestAnswers";
import axios from "axios";

function GroupTest(props) {
  const data = ChosenGroupQuestion;
  const [duudsanAsuult, setDuudsanAsuult] = useState(0);
  const [songoltHiisen, setSongoltHiisen] = useState(null);
  const [zuwHariult, setZuwHariult] = useState(null);
  const [tugjee, setTugjee] = useState(false);
  const [onoo, setOnoo] = useState(0);
  const idBuleg = props.bulegid;

  const demo = async () => {
    console.log(idBuleg);
    try {
      const res = await axios.get(
        `http://10.150.43.202:3000/asuult/buleg/${idBuleg}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    demo();
  }, []);

  const hariultShalgah = (songolt) => {
    let zuw_hariult = data[duudsanAsuult]["zuwHariult"];
    setSongoltHiisen(songolt);
    setZuwHariult(zuw_hariult);
    setTugjee(true);
    if (songoltHiisen == zuwHariult) {
      setOnoo(onoo + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text
          style={{ color: "gray", fontSize: 20, opacity: 0.6, marginRight: 2 }}
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
}

export default GroupTest;
