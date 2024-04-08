import { Axios } from "axios";
import React from "react";
import { Text, View } from "react-native";

const RandomTest20 = () => {
  const questions = async () => {
    try {
      const res = await axios.get(
        `http://10.150.43.202:3000/asuult/buleg/${idBuleg}`
      );
      res = res.data;
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View>
      <Text></Text>
    </View>
  );
};
