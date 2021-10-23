import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const AddNewPost = ({ navigation }) => {
  return (
    <View style={styles.Container}>
      <Header navigation={navigation} />
    </View>
  );
};
const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Image
        source={{
          uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
        }}
        style={styles.backIcon}
      />
    </TouchableOpacity>
    <Text style={styles.title}>AddPost</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  Container: {
    marginHorizontal: 10,
    marginTop: 2,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backIcon: { height: 30, width: 30 },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
export default AddNewPost;
