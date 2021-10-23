import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import users from "../../data/users.js";

const Stories = () => {
  return (
    <View style={{ marginBottom: 5 }}>
      <ScrollView horizontal style={{ marginHorizontal: 10 }}>
        {users.map((item, index) => {
          return (
            <View key={index} style={styles.storie}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <Text style={{ color: "white", fontSize: 13, opacity: 0.8 }}>
                {item.name.length > 11
                  ? item.name.slice(0, 10) + ".."
                  : item.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storie: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "red",
    marginBottom: 4,
  },
});

export default Stories;
