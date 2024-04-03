import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import ChosenGroupQuestion from "../Data/ChosenGroupQuestion";
import GroupTestAnswers from "../Components/GroupTestAnswers";

function GroupTest(props) {
  const data = ChosenGroupQuestion;
  const [duudsanAsuult, setDuudsanAsuult] = useState(0);
  const [songoltHiisen, setSongoltHiisen] = useState(null);
  const [zuwHariult, setZuwHariult] = useState(null);
  const [tugjee, setTugjee] = useState(false);
  const [onoo, setOnoo] = useState(0);

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

      {next == false ? null : <NExt></NExt>}
    </SafeAreaView>
  );
}

export default GroupTest;
