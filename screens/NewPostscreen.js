import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  View,
} from "react-native";
import AddNewPost from "../components/newpost/AddNewPost";
import FormikPostUploader from "../components/newpost/FormikPostUploader";

const NewPostscreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <SafeAreaView style={styles.Container}>
        <AddNewPost navigation={navigation} />
        <FormikPostUploader navigation={navigation} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#000",
    marginHorizontal: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default NewPostscreen;
