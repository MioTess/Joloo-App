import React, { useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GroupTestDataExample from "../Data/GroupTestDataExample";
import GroupTest from "./GroupTest";
import url from "../Data/url";

function GroupTestScreen(props) {
  const FlatData = GroupTestDataExample;
  const [isChoose, setIsChoose] = useState(false);
  const [bid, setBid] = useState(0);
  const [internetPro, setInternetPro] = useState(url);
  const handleClick = (selid) => {
    setIsChoose(true);
    setBid(selid);
  };
  const isChooseGroup = () => {
    return (
      <FlatList
        data={FlatData}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              handleClick(item.id);
              setBid(item.id);
            }}
            style={styles.itemContainer}
          >
            <View>
              <Text style={styles.itemText}>
                {index + 1}. {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        {isChoose == false ? (
          isChooseGroup()
        ) : (
          <GroupTest
            style={{ flex: 1 }}
            bulegid={bid}
            navigate={props.navigation}
            internetPro={internetPro}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default GroupTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#F4D03F",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
