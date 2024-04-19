import React from "react";
import { View, Image } from "react-native";

const ImgTst = () => {
  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  const images = importAll(
    require.context("../Images/image", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <View>
      {Object.keys(images).map((imageName, index) => {
        if (imageName == "s1a8.jpg")
          return <Image key={index} source={images[imageName]} />;
      })}
    </View>
  );
};

export default ImgTst;
