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

function GroupTestScreen(props) {
  const FlatData = GroupTestDataExample;
  const [isChoose, setIsChoose] = useState(false);
  const handleClick = () => {
    setIsChoose(true);
  };
  const isChooseGroup = () => {
    return (
      <FlatList
        data={FlatData}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              handleClick();
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isChoose == false ? isChooseGroup() : <GroupTest />}
      </View>
    </SafeAreaView>
  );
}

export default GroupTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  itemContainer: {
    backgroundColor: "#fff",
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
